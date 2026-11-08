#!/usr/bin/env python3
"""
Antigravity (agy) CLI Provider Bridge for Copperhead.
Accepts Copperhead's prompt on stdin, invokes `agy --output-format json --disable-slash-commands --sandbox --print`,
and returns the structured JSON response expected by Copperhead's CLI provider interface.
"""
import json
import os
import subprocess
import sys


def parse_args(argv):
    model = None
    resume = None
    i = 0
    while i < len(argv):
        arg = argv[i]
        if arg == "--model" and i + 1 < len(argv):
            model = argv[i + 1]
            i += 2
        elif arg == "--resume" and i + 1 < len(argv):
            resume = argv[i + 1]
            i += 2
        else:
            i += 1
    return model, resume


def main():
    prompt = sys.stdin.read()
    model, resume = parse_args(sys.argv[1:])

    agy_bin = "/home/shouryapandey/.gemini/antigravity-cli/bin/agy"
    if not os.path.exists(agy_bin):
        agy_bin = "agy"

    cmd = [
        agy_bin,
        "--output-format",
        "json",
        "--disable-slash-commands",
        "--sandbox",
    ]
    if model:
        cmd.extend(["--model", model])
    if resume:
        cmd.extend(["--conversation", resume])

    # Pass prompt via --print=<prompt> so flags are never confused with the prompt text
    cmd.append(f"--print={prompt}")

    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, check=False)
    except Exception as exc:
        err_obj = {
            "type": "result",
            "is_error": True,
            "result": f"Failed to invoke Antigravity CLI (agy): {exc}",
        }
        sys.stdout.write(json.dumps(err_obj) + "\n")
        sys.exit(0)

    stdout = (proc.stdout or "").strip()
    data = None
    for line in reversed(stdout.splitlines()):
        line = line.strip()
        if line.startswith("{") and line.endswith("}"):
            try:
                data = json.loads(line)
                break
            except Exception:
                continue

    if not data:
        err_msg = (proc.stderr or stdout or f"agy exited with code {proc.returncode}").strip()
        out = {
            "type": "result",
            "is_error": True,
            "result": f"Antigravity CLI error: {err_msg}",
        }
        sys.stdout.write(json.dumps(out) + "\n")
        sys.exit(0)

    is_err = data.get("status") != "SUCCESS"
    response_text = data.get("response", "")
    conv_id = data.get("conversation_id")

    out = {
        "type": "result",
        "is_error": is_err,
        "result": response_text,
        **({"session_id": conv_id} if conv_id else {}),
    }
    sys.stdout.write(json.dumps(out) + "\n")


if __name__ == "__main__":
    main()
