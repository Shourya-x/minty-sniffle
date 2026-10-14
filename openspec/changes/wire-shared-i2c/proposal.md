# Proposal: wire-shared-i2c

> Marker: AUTO (autonomous mode; auto-approved, reviewable after the fact)

## Why

Continue the authorized wiring using the shared bus specified in wire.md and the pin names present in the schematic.

## What Changes

- Surgically connect SDA to U1.8 (P0.28), U2.3, U3.5, and U4.7; connect SCL to U1.9 (P0.29), U2.4, U3.6, and U4.8.
- Set R1 and R2 to 4.7k; connect R1 between VDD and SDA and R2 between VDD and SCL. These are the only bus pull-ups.
- Tie U2.2 CSB to VDD for I2C mode, U2.5 SDO to GND for provisional address 0x76, and U3.7 WP to GND for writes enabled.
- Leave U3.1-U3.3 NC. Treat FRAM block addresses as potentially spanning 0x50-0x57 rather than assuming only 0x50; this provisional range does not overlap 0x76 or the guide's RTC address 0x32, but manufacturer verification remains pending.
- Preserve all symbol names, pin numbers, and component placement. Document provisional GPIO assignments and remaining RTC backup/interrupt concerns.
- Update docs/BOM.md, docs/PINOUT.md, docs/SPEC.md, docs/SUBSYSTEMS.md and decision log.
