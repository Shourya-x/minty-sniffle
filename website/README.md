# 🍬👃 Minty-Sniffle — Official Hardware Showcase & Datasheet Website

Built with **Astro 5** and **Three.js** (`WebGL`), presenting the finalized Minty-Sniffle hardware archive in a dual-theme (**Light Datasheet** / **Dark Hardware Lab**) interactive showcase.

## Features
- **Interactive 3D Hardware & Enclosure Studio (`Viewer3D.astro`)**: Real-time Three.js WebGL viewer rendering the exported KiCad 3D PCBA (`public/models/minty-sniffle-pcba.glb`) inside the `50 × 30 × 15 mm` louvered enclosure (`public/models/Enclosure.FCStd`) with an Explode View slider (`0%–100%`), X-Ray shell toggle, Wireframe mode, and camera presets.
- **Interactive Soft-Power Latch Simulator**: Step-by-step circuit state walkthrough for the `AO3401A (Q1) + 2N7002 (Q2) + BAT54J (D3–D5)` soft-power latch.
- **2D Schematic & PCB Layer Plot Viewer**: Zoom & pan explorer for `schematic.svg`, `pcb-top.svg`, `pcb-bottom.svg`, and raytraced 3D renders.
- **Searchable BOM & Pinout Matrix**: All 42 BOM items with `.CSV` export and 36 schematic pin-to-net assignments.
- **Reference Datasheets Vault**: Direct access to all 7 component PDF datasheets.

## Commands

Run from `/website`:

```bash
npm install
npm run dev      # Starts local dev server at http://localhost:4321
npm run build    # Builds static production bundle into ./dist/
npm run preview  # Previews production build locally
```
