---
name: copperhead-eda
description: >-
  Use this skill when inspecting, verifying (ERC/DRC/doc-drift), syncing, or exporting
  KiCad schematics and PCBs in the Minty-Sniffle repository via Copperhead (/usr/local/bin/copperhead)
  and kicad-cli.
---

# Copperhead & KiCad 10 EDA Workflow

## Configured Project Paths
- **Schematic**: `hardware/kicad/Minty-sniffle/Minty-sniffle.kicad_sch`
- **PCB**: `hardware/kicad/Minty-sniffle/Minty-sniffle.kicad_pcb`
- **Docs**: `docs/` (`SPEC.md`, `BOM.md`, `PINOUT.md`, `SUBSYSTEMS.md`, `LAYOUT.md`, `DECISIONS.md`, `CHANGELOG.md`)
- **Copperhead Config**: `.copperhead/config.json`

## Key Deterministic Commands (No LLM Call Required)
1. **Verify ERC, DRC, and Doc-Drift**:
   ```bash
   copperhead check
   ```
2. **Environment & Toolchain Doctor**:
   ```bash
   copperhead doctor
   ```
3. **Export Fabrication Package**:
   ```bash
   copperhead export
   ```
4. **Re-export Website 3D GLB & 2D SVGs**:
   ```bash
   kicad-cli pcb export glb hardware/kicad/Minty-sniffle/Minty-sniffle.kicad_pcb -o website/public/models/minty-sniffle-pcba.glb --subst-models --include-tracks --include-zones --include-silkscreen --include-soldermask --include-pads
   ```
