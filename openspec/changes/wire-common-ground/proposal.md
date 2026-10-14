# Proposal: wire-common-ground

> Marker: AUTO (autonomous mode; auto-approved, reviewable after the fact)

## Why

Begin the authorized wiring using explicit ground pin names and battery polarity already present in the schematic, without external datasheet verification.

## What Changes

- Surgically add GND connections to BT1.N, U2.1, U2.7, U3.4, and U4.5 in hardware/kicad/Minty-sniffle/Minty-sniffle.kicad_sch.
- Preserve existing U1 ground connections.
- Update docs/PINOUT.md, docs/DECISIONS.md, docs/SPEC.md, docs/SUBSYSTEMS.md, and docs/CHANGELOG.md with connections, rationale, and the user-authorized unverified status.
- Supply and signal wiring remains pending determination of topology, component values, and pin assignments; no current budget is documented.
