# Minty-sniffle — Specification

What the device is, top-level constraints and budgets.

## ERC verification policy

The unrestricted post-latch ERC report contained zero errors and 40 warnings: missing legacy symbol/footprint libraries, embedded graphical symbol differences, and the existing U2 SDO bidirectional pin strapped to GND with an ERC power-output marker. These warnings are reviewed and retained here, not claimed to be physically repaired.

Project warning policy: lib_symbol_issues, lib_symbol_mismatch and footprint_link_issues are ignored for this source-preserving implementation. verify_symbols independently checks active-part pin mappings; it confirms all new Q1/Q2/D3-D5 pins, while legacy module/holder/RTC/resistor libraries remain unavailable. The pin-map bidirectional/power-output pair is allowed symmetrically to accommodate the intentional SDO supply strap; pin_to_pin severity and every original error-producing matrix entry remain unchanged. This pair-level allowance also applies to future bidirectional-to-power-output connections and must be revisited if such wiring is added. All existing electrical error rules remain enabled. A configured clean ERC is not proof of manufacturer limits, missing footprint availability or hardware performance.

## Budgets

<!-- Add hard budgets here; copperhead treats them as constraints, e.g. -->
<!-- - sleep_current_uA: 25 -->

## Assumptions

- ASSUMED: R4=2.2M/R5=1M measure BAT+ on current module pin 7/P0.02 (BAT_ADC), with C8=10nF filtering. Rationale: wire.md authorizes a high-impedance divider on an unused ADC GPIO; the existing module symbol identifies pin 7 as P0.02; the earlier referenced datasheets/holyiot18039.md is absent in this checkout. Divider current is 0.9375uA at 3V and 1.125uA at 3.6V, excluding ADC leakage. Firmware must allow at least 50ms settling and appropriate SAADC acquisition time. No numeric total sleep-current budget is specified.
- The current user request governs only the soft-power latch and supersedes wire.md's earlier latch exclusion. Preserve the finalized MCU, sensors, memory, RTC, raw-battery divider, SWD, decoupling and test points; no unrelated GPIO changes, component substitutions or PCB edits.
- Dedicated module pins: 1.12/P0.04 = PWR_HOLD output; 1.13/P0.05 = PWR_BUTTON input. Existing symbol pin mapping is confirmed; no local manufacturer strapping table or electrical-limit documents are available, so these checks remain UNVERIFIED.
- Q1=AO3401A and Q2=2N7002 are mandatory; D3-D5=BAT54J are BAT54-family Schottky diodes. R6/R7=100k, R9=1k, R10/R11=100k and C9=100nF. Installed active-part symbol pin maps are verified; manufacturer voltage, leakage and low-voltage switching margins remain UNVERIFIED.
- Default OFF requires R6 and C9 connected gate-to-source, R7 connected Q2 gate-to-GND, and no MCU/button connection that directly drives the battery-side gate from a GPIO. D3 isolates HOLD; D4 provides startup; D5 blocks forward button-node back-powering. Schottky reverse leakage is nonzero and unquantified.
- Firmware: press SW3; assert P0.04 HIGH early during boot before release; read P0.05 active LOW. To shut down, save state, finish flash writes, disconnect BLE, wait for SW3 release, then drive P0.04 LOW. A held startup button overrides firmware OFF. R6*C9=10ms is only a gate-release time constant, not a guaranteed boot interval; minimum button press must cover actual boot latency.
- No numeric total sleep-current budget is specified. At 3V, R11 draws 30uA while ON, R6 draws approximately 30uA while held ON, and R7 draws up to 30uA depending on diode drop; R10 draws approximately 30uA only during a press. The preserved divider draws 0.9375uA at 3V and 1.125uA at 3.6V even while OFF.
- R11 limits residual SYS_VBAT voltage from the preserved battery-to-ADC path: conservative divider-only bound is BAT+*100k/2.2M = 0.164V at 3.6V, excluding transistor/diode leakage and external debug power. C1=220uF with R11=100k gives approximately 22s discharge time constant without other loads. OFF means the main battery power path is open; zero battery current, immediate zero rail voltage, and absence of all GPIO injection are not established with the preserved divider. Programming equipment must not inject power while testing shutdown.

- Existing source assignments retained: module 1.26/P0.22 drives LED_GPIO; 1.17/P0.12 reads SW1/BUTTON with a firmware internal pull-up; 1.21/P0.23 is labeled RESET. These differ from old U1 documentation; only documentation is corrected.

- ASSUMED/UNVERIFIED: module 1 P0.28/P0.29 provide SDA/SCL. Exactly one 4.7k pull-up pair (R1/R2) connects to SYS_VBAT (the renamed existing VDD distribution). MCU pin suitability has not been checked against manufacturer documentation.
- ASSUMED/UNVERIFIED: U2 address 0x76 with SDO grounded, U3 may occupy 0x50-0x57, and U4 address is 0x32 per wire.md. These provisional ranges do not overlap; verify actual address decoding before firmware integration.

- ASSUMED: BT1.N, U2.1, U2.7, U3.4, and U4.5 share GND, based on the existing symbol polarity and pin names. Rationale: establish the common return before supply and signal wiring.
- User authorized wiring without datasheet verification; these connections remain unverified against manufacturer documentation.
- Existing CR2477 coin-cell architecture is retained (nominal 3V, 1000mAh). D2 and the earlier manual entry were absent in the input source. Q1 now switches BAT+ to SYS_VBAT, which is the renamed existing VDD distribution; the battery divider still measures raw BAT+. A single PMOS is not claimed to provide reverse-polarity or bidirectional blocking protection.
- BOM.csv is missing; fitted status, component ratings, and manufacturer limits remain UNVERIFIED.
- U2 is placed as BME680 while wire.md requests BME688. U3 pins 1–3 are NC in both placed and installed symbols, contradicting the guide's A0–A2 instruction. U4 has no crystal pins in the placed symbol; external-crystal and backup-power intent remain unresolved.

<!-- Decisions the agent made without explicit direction are flagged ASSUMED here -->
