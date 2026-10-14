# Subsystems

Per-sheet values and reasoning (regulator, charger, RF, ...).

## Sheet /

### MCU
Existing module reference 1 retained; only dedicated pins 12/P0.04 and 13/P0.05 added for the latch.

### SENSOR
Existing BME680 and its I2C/mode/address connections retained.

### MEMORY
Existing FM24CL16B-GTR and its NC/write-protect/I2C connections retained.

### RTC
Existing SD3031 supply and I2C connections retained; no backup or interrupt rewiring.

### BATTERY CONNECTOR
Existing BT1 holder retained; positive BAT+ now feeds Q1 source and the preserved raw-battery divider. D2 was absent before this run.

### I2C PULLUPS
Existing sole 4.7k R1/R2 pair retained on the renamed SYS_VBAT rail.

### STATUS LED
Existing LED_GPIO/R3/D1 and SW1/BUTTON connections retained. Current source assigns LED_GPIO to 1.26/P0.22 and BUTTON to 1.17/P0.12; old U1 assignments below are historical, not current.

### SWD / RESET
Existing J1, R8, SW2 and RESET/SWDIO/SWCLK connections retained without correction of unrelated circuitry.

### DECOUPLING CAPACITOR
C1-C7 retained across SYS_VBAT/GND, with C8 retained across BAT_ADC/GND. Supply pin names are unchanged; only the system net name changes.

### BATTERY DIVIDER
R4=2.2M and R5=1M retain raw BAT+ sensing on 1.7/P0.02 with C8=10nF; retain at least 50ms settling and suitable SAADC acquisition time.

### TESTING POINTS
TP1-TP7 preserved; TP1's displayed rail name is synchronized to SYS_VBAT.

### ERC warning reconciliation
Original post-latch ERC: zero errors, 40 warnings. The project now ignores reviewed library-availability/graphic-mismatch/footprint-link warning categories and allows the bidirectional/power-output warning pair for the existing SDO-to-GND strap. No electrical error rule or error-level pin-matrix entry is disabled. Independent pin-map verification is retained. These settings also affect future matching warnings; revisit them when libraries or supply-strapped bidirectional connections change. See docs/SPEC.md#ERC-verification-policy for limitations.

### MCU SOFT POWER LATCH
Q1 AO3401A: G=PMOS_GATE, S=BAT+, D=SYS_VBAT. Q2 2N7002: G=NMOS_GATE, S=GND, D=PMOS_GATE. R6=100k pulls PMOS_GATE to BAT+; R7=100k pulls NMOS_GATE to GND. R9=1k connects PWR_HOLD to HOLD_DRIVE; D3 anode=HOLD_DRIVE/cathode=NMOS_GATE. R10=100k pulls PWR_BUTTON to SYS_VBAT. D4 anode=PMOS_GATE/cathode=START_BUTTON; D5 anode=PWR_BUTTON/cathode=START_BUTTON; SW3 connects START_BUTTON to GND when pressed. C9=100nF connects BAT+ to PMOS_GATE. R11=100k connects SYS_VBAT to GND.

Rationale: independent diode branches allow button startup and MCU hold without output contention or a forward battery-to-button-GPIO path. C9 is intentionally gate-to-source; a gate-to-ground startup capacitor would risk battery-insertion auto-start. R11 limits divider-only ghost voltage and discharges the rail; the raw battery divider is intentionally preserved. Schottky reverse leakage, Q1/Q2 off leakage and low-voltage switching margins remain UNVERIFIED. No manufacturer documentation was available locally.

Sequence: hold SW3 during boot until P0.04 asserts HIGH; release SW3 and Q2 holds Q1 ON. P0.05 detects later presses active LOW. For shutdown save state, complete flash writes, disconnect BLE, wait for SW3 release and drive P0.04 LOW. R6*C9=10ms is not a guaranteed boot interval. C1/R11 alone give approximately 22s rail discharge time constant; other loads shorten it. Main-path OFF does not mean zero divider current or immediate zero voltage.

At 3V, R11 adds 30uA ON-state current; R6 approximately 30uA, R7 at most 30uA, and R10 approximately 30uA during a press. The preserved divider consumes 0.9375uA at 3V and 1.125uA at 3.6V even while OFF. Divider-only injection into R11 bounds residual SYS_VBAT to approximately 0.164V at 3.6V; semiconductor leakage and debug injection are excluded. No numeric sleep-current budget exists.

ERC markers #FLG01 and #FLG02 indicate SYS_VBAT and GND. Their hidden Value fields use the rail names to avoid a spurious PWR_FLAG net in the documentation parser; they remain power-output-only markers with no physical component or connection change.

### Earlier subsystem notes (superseded where inconsistent)
The following pre-run notes describe obsolete U1/D2 power entry. Current wiring is the explicit subsystem description above and docs/PINOUT.md; these older notes do not authorize circuit changes.

Documented schematic groups: MCU, SENSOR, MEMORY, RTC, BATTERY CONNECTOR, I2C PULLUPS, STATUS LED, SWD / RESET, DECOUPLING CAPACITOR, BATTERY DIVIDER, TESTING POINTS, MCU SOFT POWER LATCH. Existing group wiring is preserved; captions describe the finalized subsystems.

ERC-only #FLG01 on VDD and #FLG02 on GND identify the existing battery/series-diode supply and common return. Rationale: passive battery and diode symbol pins do not advertise a power-output driver to ERC; flags add no physical components or power paths.

Ground wiring: BT1.N, U2.1, U2.7, U3.4, and U4.5 connect to GND alongside the existing U1 grounds. Rationale: provide a common return using explicit symbol pin names and battery polarity; no datasheet verification performed. Power wiring in progress: BT1.P and D2.3 share BAT+; D2.1 supplies VDD to U1.87, U2.6, U2.8, U3.8, and U4.2. D2.2 is intentionally unused because only one series diode is required. C1-C6 decoupling connections are added; physical placement and ratings remain unverified. RTC backup and signal wiring remain unfinished.

- BT1: BH1000G
- C1: 220uF — VDD/GND bulk reservoir per wire.md.
- C2: 4.7uF — VDD/GND module bulk bypass per wire.md.
- C3: 100nF — VDD/GND decoupling per wire.md.
- C4: 100nF — VDD/GND decoupling per wire.md.
- C5: 100nF — VDD/GND decoupling per wire.md.
- C6: 100nF — VDD/GND decoupling per wire.md.

C1-C6 ratings, leakage, packages, fitted status and physical placement remain UNVERIFIED; these schematic connections do not establish heater-pulse power performance.
- C7: 100nF — module local VDD/GND decoupling per wire.md.

Current module reference is `1`, ISC-nRF52840-A, with supply pin 14 connected to VDD and ground pins 1, 25 and 37 connected to GND. C3/C4 serve U2 VDDIO/VDD, C5 serves U3, C6 serves U4 and C7 serves the module. Rationale: one local 100nF bypass per IC supply; C1/C2 remain the existing rail/module bulk capacitors. Capacitor PCB adjacency remains to be implemented; no board changes made.
- D1: LED
- D2: BAT54A
- R1: 4.7k — sole SDA pull-up to VDD.
- R2: 4.7k — sole SCL pull-up to VDD.

Shared I2C: SDA joins current module 1.8 (P0.28), U2.3, U3.5, U4.7 and R1.2; SCL joins current module 1.9 (P0.29), U2.4, U3.6, U4.8 and R2.2. R1.1/R2.1 connect to VDD. U2.2 connects to VDD for I2C mode; U2.5 connects to GND for provisional address 0x76; U3.7 connects to GND to enable writes. Rationale: implement wire.md's shared interface while retaining actual NC pins. MCU assignments and addresses remain UNVERIFIED.
- R3: 1k — series LED resistor per wire.md.

LED: U1.10 -> LED_GPIO -> R3.1; R3.2 -> LED_A -> D1.2; D1.1 -> GND. Button: U1.11 and SW1.1 share BUTTON; SW1.2 -> GND. Rationale: implement the documented indicators/input with no added components. GPIO choices remain UNVERIFIED; firmware must enable the BUTTON internal pull-up.
- R4: 2.2M — BAT+ to BAT_ADC.
- R5: 1M — BAT_ADC to GND.
- C8: 10nF — BAT_ADC to GND, local sampling reservoir.

Battery measurement: BAT_ADC connects current module 1.7/P0.02. Rationale: unused analog-capable pin and high impedance implement wire.md without changing existing GPIO assignments. Ratio = 0.3125; battery voltage = ADC voltage ×3.2; nominal 3V divider current = 0.9375uA, and 3.6V current = 1.125uA. C8 and the 687.5kΩ Thevenin resistance give a 6.875ms time constant; firmware must allow at least 50ms settling after configuration and use a suitable SAADC acquisition interval. Raw battery sensing remains present while VDD is off; power-off input leakage is not quantified by the provided module documents.
- R6: ${VALUE}
- R7: ${VALUE}
- SW1: SW_Push
- U1: 
- U2: BME680
- U3: FM24CL16B-GTR
- U4: 
