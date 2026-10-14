# Bill of Materials

Every part: refdes, MPN, value, package, and WHY it was chosen. MPNs the agent
introduces without a datasheet check are flagged UNVERIFIED.

Value holds the component value only ("4.7uF", "1M", "500mAh Li-Po") — the
schematic stage draws it as the symbol's Value field, so a description there
collides with neighbouring symbols and fails the legibility gate. Prose belongs
in Rationale. One row per refdes; a grouped row ("C5-C8") matches no symbol.

| Refdes | Value | Footprint | MPN | Rationale |
|---|---|---|---|---|
| BT1 | BH1000G | BH1000G:BAT_BH1000G | UNVERIFIED | extracted from schematic by copperhead init |
| C1 | 220uF |  | UNVERIFIED | Bulk energy reservoir across SYS_VBAT/GND per wire.md; rating, leakage, ESR, package and fitted status unverified. |
| C2 | 4.7uF |  | UNVERIFIED | Module bulk bypass per wire.md; rating, leakage, package and fitted status unverified. |
| C3 | 100nF |  | UNVERIFIED | Supply decoupling per wire.md; rating, leakage, package and fitted status unverified. |
| C4 | 100nF |  | UNVERIFIED | Supply decoupling per wire.md; rating, leakage, package and fitted status unverified. |
| C5 | 100nF |  | UNVERIFIED | Supply decoupling per wire.md; rating, leakage, package and fitted status unverified. |
| C6 | 100nF |  | UNVERIFIED | Supply decoupling per wire.md; rating, leakage, package and fitted status unverified. |
| C7 | 100nF |  | UNVERIFIED | Local MCU SYS_VBAT decoupling per wire.md; retain existing symbol and pending footprint selection. |
| D1 | LED |  | UNVERIFIED | extracted from schematic by copperhead init |
| R1 | 4.7k |  | UNVERIFIED | Sole SDA pull-up to SYS_VBAT per wire.md; package and fitted status unverified. |
| R2 | 4.7k |  | UNVERIFIED | Sole SCL pull-up to SYS_VBAT per wire.md; package and fitted status unverified. |
| R3 | 1k |  | UNVERIFIED | LED series resistor per wire.md; LED characteristics, package and fitted status unverified. |
| R4 | 2.2M |  | UNVERIFIED | High-impedance battery divider upper resistor; BAT+ to BAT_ADC. |
| R5 | 1M |  | UNVERIFIED | Battery divider lower resistor; BAT_ADC to GND. |
| C8 | 10nF | Capacitor_SMD:C_0603_1608Metric | UNVERIFIED | ADC sampling reservoir and divider filtering; use at least 6.3V ceramic and place beside P0.02; library availability pending. |
| R6 | 100k | Resistor_SMD:R_0603_1608Metric | UNVERIFIED | PMOS gate-to-source pull-up defaults Q1 OFF. |
| R7 | 100k | Resistor_SMD:R_0603_1608Metric | UNVERIFIED | NMOS gate pull-down defaults Q2 OFF during reset/shutdown. |
| SW1 | SW_Push |  | UNVERIFIED | extracted from schematic by copperhead init |
| 1 | ISC-nRF52840-A | ISC-nRF52840-MODULE | UNVERIFIED | Existing two-unit module retained; dedicated pins 12/13 support the latch. |
| U2 | BME680 | Package_LGA:Bosch_LGA-8_3x3mm_P0.8mm_ClockwisePinNumbering | UNVERIFIED | extracted from schematic by copperhead init |
| U3 | FM24CL16B-GTR | infineon fram ic:SOIC-8 | UNVERIFIED | extracted from schematic by copperhead init |
| U4 |  | Package_SO:SOIC-8_5.3x5.3mm_P1.27mm | UNVERIFIED | Existing SD3031 retained without signal changes. |
| C9 | 100nF | Capacitor_SMD:C_0603_1608Metric | UNVERIFIED | Gate-to-source startup/filter capacitor; avoids a gate-to-ground insertion pulse. Use ceramic rated at least 6.3V. |
| D3 | BAT54J | Diode_SMD:D_SOD-323 | BAT54J — UNVERIFIED | BAT54-family Schottky isolates PWR_HOLD from NMOS_GATE; installed pin map verified. |
| D4 | BAT54J | Diode_SMD:D_SOD-323 | BAT54J — UNVERIFIED | BAT54-family Schottky lets SW3 sink PMOS_GATE independently of Q2. |
| D5 | BAT54J | Diode_SMD:D_SOD-323 | BAT54J — UNVERIFIED | BAT54-family Schottky blocks the high battery-side button node from P0.05. |
| Q1 | AO3401A | Package_TO_SOT_SMD:SOT-23 | AO3401A — UNVERIFIED | User-specified high-side PMOS; source BAT+, drain SYS_VBAT; installed pin map verified. |
| Q2 | 2N7002 | Package_TO_SOT_SMD:SOT-23 | 2N7002 — UNVERIFIED | User-specified gate-sink NMOS driven by PWR_HOLD; installed pin map verified. |
| R9 | 1k | Resistor_SMD:R_0603_1608Metric | UNVERIFIED | PWR_HOLD series resistor limits switching current. |
| R10 | 100k | Resistor_SMD:R_0603_1608Metric | UNVERIFIED | PWR_BUTTON pull-up to switched rail only; no battery pull-up on GPIO. |
| R11 | 100k | Resistor_SMD:R_0603_1608Metric | UNVERIFIED | Switched-rail discharge support limits preserved BAT_ADC backfeed; costs 30uA at 3V while ON. |
| SW3 | SW_Push |  | UNVERIFIED | Dedicated normally-open power button; preserves SW1 and SW2. Physical switch/package selection pending. |
| J1 | TC2030 | Connector:Tag-Connect_TC2030-IDC-NL_2x03_P1.27mm_Vertical | UNVERIFIED | Existing SWD connector retained. |
| R8 | 10k | Resistor_SMD:R_0603_1608Metric | UNVERIFIED | Existing reset pull-up retained. |
| SW2 | SW_Push |  | UNVERIFIED | Existing reset switch retained. |
| TP1 | SYS_VBAT | TestPoint:TestPoint_Pad_D1.0mm | UNVERIFIED | Existing system-rail test pad retained with rail name synchronized. |
| TP2 | GND | TestPoint:TestPoint_Pad_D1.0mm | UNVERIFIED | Existing ground test pad retained. |
| TP3 | SDA | TestPoint:TestPoint_Pad_D1.0mm | UNVERIFIED | Existing SDA test pad retained. |
| TP4 | SCL | TestPoint:TestPoint_Pad_D1.0mm | UNVERIFIED | Existing SCL test pad retained. |
| TP5 | SWDIO | TestPoint:TestPoint_Pad_D1.0mm | UNVERIFIED | Existing SWDIO test pad retained. |
| TP6 | SWCLK | TestPoint:TestPoint_Pad_D1.0mm | UNVERIFIED | Existing SWCLK test pad retained. |
| TP7 | RESET | TestPoint:TestPoint_Pad_D1.0mm | UNVERIFIED | Existing reset test pad retained. |

D2 and U1 were already absent in the input schematic; removing their stale BOM rows does not remove hardware. Module reference 1 is intentionally retained. No manufacturer leakage/voltage check was possible using the supplied local files; new active MPNs remain UNVERIFIED.
