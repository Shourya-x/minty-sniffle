---
name: freecad-cad
description: >-
  Use this skill when inspecting, modifying, or exporting 3D CAD models (.FCStd, .STEP, .STL)
  for the Minty-Sniffle enclosure using FreeCAD 1.1 (org.freecad.FreeCAD Flatpak) or the FreeCAD MCP server.
---

# FreeCAD 1.1 Headless CAD Workflow

## Configured Enclosure Files
- **Top Shell (`50.0 × 30.0 × 15.0 mm`, `1.0 mm` wall)**: `hardware/enclosure/Enclosure.FCStd`
- **Bottom Pocket Cap (`52.0 × 32.0 × 5.0 mm`, `50.40 × 30.06 × 1.00 mm` pocket)**: `hardware/enclosure/bottom.FCStd`
- **Assembly**: `hardware/enclosure/assembly.FCStd` & `hardware/enclosure/bottom 2.FCStd`

## Headless Execution via `FreeCADCmd`
Run Python scripts directly inside FreeCAD 1.1:
```bash
flatpak run --command=FreeCADCmd org.freecad.FreeCAD -c "
import FreeCAD, MeshPart
doc = FreeCAD.openDocument('hardware/enclosure/Enclosure.FCStd')
body = doc.getObject('Body')
print(body.Shape.BoundBox)
"
```

## Exporting STL Meshes for Website 3D Viewer
- `website/public/models/enclosure-top.stl` (from `hardware/enclosure/Enclosure.FCStd`)
- `website/public/models/enclosure-bottom.stl` (from `hardware/enclosure/bottom.FCStd`)
