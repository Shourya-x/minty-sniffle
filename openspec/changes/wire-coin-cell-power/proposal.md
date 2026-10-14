# Proposal: wire-coin-cell-power

> Marker: AUTO (autonomous mode; auto-approved, reviewable after the fact)

## Why

Continue authorized wiring using the power topology and capacitor values in wire.md while preserving the actual placed parts and their pin definitions.

## What Changes

- In the existing schematic, connect BT1.P to D2.3 (BAT54A common anode), D2.1 to VDD, and intentionally leave D2.2 unused with a no-connect marker.
- Connect VDD to U1.87, U2.6, U2.8, U3.8, and U4.2.
- Set C1 to 220uF, C2 to 4.7uF, and C3-C6 to 100nF; connect each across VDD and GND. Preserve footprints and mark unspecified ratings/MPNs UNVERIFIED.
- Retain U4.6 pending backup-power intent; do not invent an external crystal connection when the placed symbol has no crystal pins.
- Update BOM, PINOUT, SPEC, SUBSYSTEMS, decisions, and changelog. Record BME680/BME688 and FRAM address-pin discrepancies.
- Preserve placement as required by wire.md; document its conflict with the legibility gate before moving components. No PCB edits.
