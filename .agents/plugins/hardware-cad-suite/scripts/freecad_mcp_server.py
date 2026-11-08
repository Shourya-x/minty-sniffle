#!/usr/bin/env python3
"""
FreeCAD 1.1 MCP Server (stdio JSON-RPC 2.0)
Connects Antigravity directly to FreeCADCmd (org.freecad.FreeCAD Flatpak).
"""
import json
import subprocess
import sys
import os

TOOLS = [
    {
        "name": "freecad_inspect_document",
        "description": "Inspect a FreeCAD (.FCStd) document: list all objects, types, faces, volumes, and exact 3D bounding boxes (in mm).",
        "inputSchema": {
            "type": "object",
            "properties": {
                "file_path": {
                    "type": "string",
                    "description": "Path to the .FCStd file (absolute or relative to workspace)"
                }
            },
            "required": ["file_path"]
        }
    },
    {
        "name": "freecad_export_mesh",
        "description": "Export a 3D mesh (.stl or .obj) from a FreeCAD (.FCStd) document object using MeshPart.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "fcstd_path": {
                    "type": "string",
                    "description": "Input .FCStd file path"
                },
                "output_path": {
                    "type": "string",
                    "description": "Output mesh file path (.stl or .obj)"
                },
                "object_name": {
                    "type": "string",
                    "description": "FreeCAD object name to export (default: 'Body')",
                    "default": "Body"
                },
                "linear_deflection": {
                    "type": "number",
                    "description": "Mesh linear deflection in mm (default: 0.05)",
                    "default": 0.05
                }
            },
            "required": ["fcstd_path", "output_path"]
        }
    },
    {
        "name": "freecad_run_python",
        "description": "Execute a Python script inside headless FreeCADCmd (has access to FreeCAD, Part, PartDesign, Sketcher, Mesh, MeshPart, Import).",
        "inputSchema": {
            "type": "object",
            "properties": {
                "script": {
                    "type": "string",
                    "description": "Python code to execute inside FreeCADCmd"
                }
            },
            "required": ["script"]
        }
    }
]


def run_freecad_python(code: str) -> str:
    cmd = ["flatpak", "run", "--command=FreeCADCmd", "org.freecad.FreeCAD", "-c", code]
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    output = (res.stdout or "") + ("\n" + res.stderr if res.stderr else "")
    return output.strip()


def handle_tool_call(name: str, args: dict) -> str:
    if name == "freecad_inspect_document":
        path = os.path.abspath(args["file_path"])
        code = f"""
import FreeCAD, json
doc = FreeCAD.openDocument({path!r})
items = []
for obj in doc.Objects:
    info = {{"name": obj.Name, "label": obj.Label, "type": obj.TypeId}}
    if hasattr(obj, "Shape") and not obj.Shape.isNull():
        bb = obj.Shape.BoundBox
        if abs(bb.XLength) < 1e6:
            info["faces"] = len(obj.Shape.Faces)
            info["volume_mm3"] = round(obj.Shape.Volume, 2)
            info["bbox_mm"] = {{
                "x": [round(bb.XMin, 3), round(bb.XMax, 3), round(bb.XLength, 3)],
                "y": [round(bb.YMin, 3), round(bb.YMax, 3), round(bb.YLength, 3)],
                "z": [round(bb.ZMin, 3), round(bb.ZMax, 3), round(bb.ZLength, 3)],
            }}
    items.append(info)
print("JSON_RESULT:" + json.dumps({{"file": {path!r}, "objects": items}}, indent=2))
"""
        raw = run_freecad_python(code)
        if "JSON_RESULT:" in raw:
            return raw.split("JSON_RESULT:", 1)[1].strip()
        return raw

    elif name == "freecad_export_mesh":
        fcstd_path = os.path.abspath(args["fcstd_path"])
        output_path = os.path.abspath(args["output_path"])
        obj_name = args.get("object_name", "Body")
        defl = float(args.get("linear_deflection", 0.05))
        code = f"""
import FreeCAD, MeshPart
doc = FreeCAD.openDocument({fcstd_path!r})
obj = doc.getObject({obj_name!r})
if obj is None:
    raise RuntimeError("Object not found: " + {obj_name!r})
mesh = MeshPart.meshFromShape(Shape=obj.Shape, LinearDeflection={defl}, AngularDeflection=0.1, Relative=False)
mesh.write({output_path!r})
print(f"Exported {{mesh.CountFacets}} facets to {output_path}")
"""
        return run_freecad_python(code)

    elif name == "freecad_run_python":
        return run_freecad_python(args["script"])

    raise ValueError(f"Unknown tool: {name}")


def main():
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            msg = json.loads(line)
        except Exception:
            continue

        method = msg.get("method")
        msg_id = msg.get("id")

        if method == "initialize":
            resp = {
                "jsonrpc": "2.0",
                "id": msg_id,
                "result": {
                    "protocolVersion": "2024-11-05",
                    "capabilities": {"tools": {"listChanged": False}},
                    "serverInfo": {"name": "freecad-mcp", "version": "1.1.4"},
                },
            }
            sys.stdout.write(json.dumps(resp) + "\n")
            sys.stdout.flush()
        elif method == "notifications/initialized":
            continue
        elif method == "tools/list":
            resp = {
                "jsonrpc": "2.0",
                "id": msg_id,
                "result": {"tools": TOOLS},
            }
            sys.stdout.write(json.dumps(resp) + "\n")
            sys.stdout.flush()
        elif method == "tools/call":
            params = msg.get("params", {})
            t_name = params.get("name", "")
            t_args = params.get("arguments", {})
            try:
                text_out = handle_tool_call(t_name, t_args)
                resp = {
                    "jsonrpc": "2.0",
                    "id": msg_id,
                    "result": {
                        "content": [{"type": "text", "text": text_out}],
                        "isError": False,
                    },
                }
            except Exception as e:
                resp = {
                    "jsonrpc": "2.0",
                    "id": msg_id,
                    "result": {
                        "content": [{"type": "text", "text": f"Error: {e}"}],
                        "isError": True,
                    },
                }
            sys.stdout.write(json.dumps(resp) + "\n")
            sys.stdout.flush()
        elif msg_id is not None:
            resp = {"jsonrpc": "2.0", "id": msg_id, "result": {}}
            sys.stdout.write(json.dumps(resp) + "\n")
            sys.stdout.flush()


if __name__ == "__main__":
    main()
