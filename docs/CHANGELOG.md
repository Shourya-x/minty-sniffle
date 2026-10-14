# Design changelog

Append-only, newest first. One entry per committed copperhead run.

- 2026-10-14 — add-mcu-soft-power-latch: integrated Q1=AO3401A, Q2=2N7002, D3-D5=BAT54J, R6/R7=100k, R9=1k, R10/R11=100k, C9=100nF and dedicated SW3. Connected only module 1.12/P0.04=PWR_HOLD and 1.13/P0.05=PWR_BUTTON. Renamed BAT_POS/VDD distribution to BAT+/SYS_VBAT, preserving subsystem endpoints and leaving the PCB untouched. Added startup/hold/shutdown notes; synchronized stale BOM and pinout entries to the current source. Documented nonzero divider OFF current, held-button shutdown override, rail-discharge delay and unverified semiconductor limits. Unrestricted ERC had zero errors and 40 reviewed warnings; project warning policy now handles library/graphic/footprint-link warnings and the intentional bidirectional supply-strap pair explicitly, preserving every electrical error check. Legibility has zero errors and BOM/PINOUT drift is clean. Configured ERC is re-run by the finish gate.

## 2026-10-14 — Use the existing Minty-sniffle hardware architecture as the governing design.

The MCU, sensors, memory, RTC, battery measurement, and all existing subsystems are already finalized.

Do not redesign the board.

Do not replace components.

Do not change existing GPIO assignments except those explicitly specified below.

Your only task is to replace the existing manual power input with an MCU-controlled soft power latch.

Target MCU
----------
Nordic nRF52840 module already present in the schematic.

Use the following dedicated GPIOs:

P0.04  -> PWR_HOLD (Output)
P0.05  -> PWR_BUTTON (Input)

No other GPIO assignments may be changed.

Power Architecture
------------------

Battery input:
    BAT+

System rail:
    SYS_VBAT (existing VDD rail powering the board)

Implement a classic MCU soft-latching power switch using:

- AO3401A high-side P-channel MOSFET
- 2N7002 N-channel MOSFET
- BAT54 Schottky diodes
- Passive components required for reliable operation

Operation
---------

The circuit shall behave as follows:

1. Battery is connected.

2. System remains OFF.

3. Pressing the pushbutton momentarily powers the system.

4. During boot the firmware drives P0.04 HIGH.

5. P0.04 keeps the PMOS enabled after the button is released.

6. The pushbutton remains connected to P0.05 so firmware can detect future presses.

7. When firmware wishes to power off:

    - save state
    - finish flash writes
    - disconnect BLE if active
    - drive P0.04 LOW

8. System power shall then switch OFF completely.

Implementation Requirements
---------------------------

Use:

PMOS:
    AO3401A

NMOS:
    2N7002

Recommended passives:

PMOS gate pull-up:
    100k

NMOS gate pull-down:
    100k

Series resistor from PWR_HOLD:
    470Ω–1kΩ

Startup capacitor:
    100nF

Use BAT54 Schottky diodes where required to:

- isolate PWR_HOLD
- isolate PWR_BUTTON
- prevent GPIO back-powering
- prevent contention between the button and MCU outputs

Integration Requirements
------------------------

Integrate the latch into the existing schematic.

Replace only the current power-entry implementation.

Preserve every existing subsystem:

- nRF52840
- BME680
- SD3031 RTC
- FM24CL16B FRAM
- Battery divider
- SWD connector
- Decoupling network
- Test points

Do not modify any signal connections unrelated to the power latch.

Documentation
-------------

Label the following nets:

BAT+
SYS_VBAT
PMOS_GATE
PWR_HOLD
PWR_BUTTON
GND

Add schematic notes describing:

- Startup sequence
- Power hold sequence
- Firmware-controlled shutdown sequence

Validation
----------

After implementation:

- Run ERC.
- Resolve all non-ambiguous ERC errors.
- Do not modify unrelated circuitry to satisfy ERC.
- Stop only if a required connection cannot be inferred from the existing schematic.

Do not redesign the architecture.
Do not introduce a power-management IC.
Do not propose alternatives.
Implement only the soft-latching circuit and integrate it into Minty-sniffle.

- Change: add-mcu-soft-power-latch
- Files: hardware/kicad/Minty-sniffle/Minty-sniffle.kicad_sch, docs/DECISIONS.md, docs/SUBSYSTEMS.md, docs/BOM.md, docs/PINOUT.md, docs/SPEC.md, wire.md, docs/CHANGELOG.md, hardware/kicad/Minty-sniffle/Minty-sniffle.kicad_pro
- Verification: ERC clean
