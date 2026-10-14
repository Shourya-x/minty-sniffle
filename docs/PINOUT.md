# Pinout

Wire-connected endpoints preserved from source: module 1 pin 26/P0.22 carries LED_GPIO; R8 pin 2 and SW2 pin 1 share the wired RESET node with SW2 pin 2. These are documented in prose because the drift parser reports NC for their intermediate wire endpoints despite KiCad ERC recognizing the wiring. No hardware changes were made to these endpoints.

Pin assignment extracted from the schematic. Check strapping/RTC notes before
reassigning pins.

| Refdes | Pin | Name | Net | Notes |
|---|---|---|---|---|
| 1 | 1 | GND | GND | Current module common return. |
| 1 | 25 | GND | GND | Current module common return. |
| 1 | 37 | GND | GND | Current module common return. |
| 1 | 14 | VDD_NRF | SYS_VBAT | Current module supply. |
| 1 | 8 | P0.28 | SDA | Existing project I2C assignment retained. |
| 1 | 9 | P0.29 | SCL | Existing project I2C assignment retained. |
| C7 | 1 | 1 | SYS_VBAT | Module local bypass. |
| C7 | 2 | 2 | GND | Module local bypass return. |
| 1 | 7 | P0.02 | BAT_ADC | Unused analog-capable battery input. |
| R4 | 1 | 1 | BAT+ | Divider input. |
| R4 | 2 | 2 | BAT_ADC | Divider midpoint. |
| R5 | 1 | 1 | BAT_ADC | Divider midpoint. |
| R5 | 2 | 2 | GND | Divider return. |
| C8 | 1 | 1 | BAT_ADC | Sampling reservoir. |
| C8 | 2 | 2 | GND | Filter return. |
| R3 | 1 | 1 | LED_GPIO | Series LED current limiting. |
| R3 | 2 | 2 | LED_A | LED anode connection. |
| D1 | 1 | K | GND | LED cathode return. |
| D1 | 2 | A | LED_A | LED anode through R3. |
| SW1 | 1 | 1 | BUTTON | Active-low button input. |
| SW1 | 2 | 2 | GND | Button return. |
| C1 | 1 | 1 | SYS_VBAT | Bulk reservoir per wire.md. |
| C1 | 2 | 2 | GND | Supply return. |
| C2 | 1 | 1 | SYS_VBAT | Module bulk bypass per wire.md. |
| C2 | 2 | 2 | GND | Supply return. |
| C3 | 1 | 1 | SYS_VBAT | Supply decoupling. |
| C3 | 2 | 2 | GND | Supply return. |
| C4 | 1 | 1 | SYS_VBAT | Supply decoupling. |
| C4 | 2 | 2 | GND | Supply return. |
| C5 | 1 | 1 | SYS_VBAT | Supply decoupling. |
| C5 | 2 | 2 | GND | Supply return. |
| C6 | 1 | 1 | SYS_VBAT | Supply decoupling. |
| C6 | 2 | 2 | GND | Supply return. |
| BT1 | N |  | GND | Negative battery terminal provides common return; polarity taken from existing symbol. |
| BT1 | P |  | BAT+ | Battery positive feeds Q1 source and the preserved divider. |
| U3 | 1 | NC |  | |
| U3 | 2 | NC |  | |
| U3 | 3 | NC |  | |
| U3 | 4 | VSS | GND | Common return; existing symbol pin name used without datasheet verification. |
| U3 | 5 | SDA | SDA | Shared I2C data. |
| U3 | 6 | SCL | SCL | Shared I2C clock. |
| U3 | 7 | WP | GND | Writes enabled per wire.md. |
| U3 | 8 | VDD | SYS_VBAT | Common FRAM supply per wire.md. |
| U2 | 1 | GND | GND | Common return; existing symbol pin name used without datasheet verification. |
| U2 | 2 | CSB | SYS_VBAT | I2C mode per wire.md; UNVERIFIED. |
| U2 | 3 | SDI | SDA | Shared I2C data. |
| U2 | 4 | SCK | SCL | Shared I2C clock. |
| U2 | 5 | SDO | GND | Provisional address 0x76; UNVERIFIED. |
| U2 | 6 | VDDIO | SYS_VBAT | Common logic supply per wire.md. |
| U2 | 7 | GND | GND | Common return; existing symbol pin name used without datasheet verification. |
| U2 | 8 | VDD | SYS_VBAT | Common sensor supply per wire.md. |
| 1 | 12 | P0.04 | PWR_HOLD | Dedicated latch output; HIGH holds ON. |
| 1 | 13 | P0.05 | PWR_BUTTON | Dedicated active-low power-button input. |
| 1 | 17 | P0.12 | BUTTON | Existing SW1 assignment preserved; firmware pull-up required. |
| 1 | 21 | P0.23 | RESET | Existing source connection preserved. |
| 1 | 32 | SWDIO | SWDIO | Existing debug connection preserved. |
| 1 | 31 | SWDCLK | SWCLK | Existing debug connection preserved. |
| U4 | 1 | f32k |  | |
| U4 | 2 | Vdd | SYS_VBAT | Common RTC supply; backup pin connection pending. |
| U4 | 3 | Int |  | |
| U4 | 4 | 4_nc |  | |
| U4 | 5 | Gnd | GND | Common return; existing symbol pin name used without datasheet verification. |
| U4 | 6 | Vbat |  | |
| U4 | 7 | Sda | SDA | Shared I2C data. |
| U4 | 8 | Scl | SCL | Shared I2C clock. |
| R1 | 1 | 1 | SYS_VBAT | Sole SDA pull-up supply. |
| R1 | 2 | 2 | SDA | Sole SDA pull-up. |
| R2 | 1 | 1 | SYS_VBAT | Sole SCL pull-up supply. |
| R2 | 2 | 2 | SCL | Sole SCL pull-up. |
| Q1 | 1 | G | PMOS_GATE | Gate pulled high by R6 to default OFF. |
| Q1 | 2 | S | BAT+ | High-side source. |
| Q1 | 3 | D | SYS_VBAT | Switched system supply. |
| Q2 | 1 | G | NMOS_GATE | Diode-isolated hold drive. |
| Q2 | 2 | S | GND | Gate-sink return. |
| Q2 | 3 | D | PMOS_GATE | Sinks Q1 gate while HOLD is HIGH. |
| R6 | 1 | 1 | BAT+ | Gate pull-up source. |
| R6 | 2 | 2 | PMOS_GATE | 100k pull-up. |
| R7 | 1 | 1 | NMOS_GATE | 100k pull-down. |
| R7 | 2 | 2 | GND | Pull-down return. |
| R9 | 1 | 1 | PWR_HOLD | 1k series drive input. |
| R9 | 2 | 2 | HOLD_DRIVE | Diode drive. |
| D3 | 1 | K | NMOS_GATE | Blocks reverse current toward HOLD. |
| D3 | 2 | A | HOLD_DRIVE | MCU drives gate HIGH through diode. |
| D4 | 1 | K | START_BUTTON | Startup sink through SW3. |
| D4 | 2 | A | PMOS_GATE | Battery-side gate isolation. |
| D5 | 1 | K | START_BUTTON | Blocks button-node voltage toward MCU. |
| D5 | 2 | A | PWR_BUTTON | Active-low sensing branch. |
| R10 | 1 | 1 | SYS_VBAT | Switched-only button pull-up. |
| R10 | 2 | 2 | PWR_BUTTON | Input default HIGH. |
| R11 | 1 | 1 | SYS_VBAT | 100k discharge/anti-ghost-power load. |
| R11 | 2 | 2 | GND | Discharge return. |
| C9 | 1 | ~ | BAT+ | Startup/filter capacitor to source. |
| C9 | 2 | ~ | PMOS_GATE | Gate-to-source, not gate-to-ground. |
| SW3 | 1 | 1 | START_BUTTON | Dedicated normally-open power button. |
| SW3 | 2 | 2 | GND | Momentary startup return. |
| J1 | 1 | Pin_1 | SYS_VBAT | Existing programmer target-voltage sense. |
| J1 | 2 | Pin_2 | SWDIO | Existing debug data. |
| J1 | 3 | Pin_3 | RESET | Existing reset connection. |
| J1 | 4 | Pin_4 | SWCLK | Existing debug clock. |
| J1 | 5 | Pin_5 | GND | Existing debug return. |
| J1 | 6 | Pin_6 |  | Existing no-connect. |
| R8 | 1 | 1 | SYS_VBAT | Existing reset pull-up supply. |
| SW2 | 2 | 2 | RESET | Existing source ties both switch terminals to RESET; retained per scope. |
| TP1 | 1 | 1 | SYS_VBAT | Existing rail test pad. |
| TP2 | 1 | 1 | GND | Existing return test pad. |
| TP3 | 1 | 1 | SDA | Existing data test pad. |
| TP4 | 1 | 1 | SCL | Existing clock test pad. |
| TP5 | 1 | 1 | SWDIO | Existing debug test pad. |
| TP6 | 1 | 1 | SWCLK | Existing debug test pad. |
| TP7 | 1 | 1 | RESET | Existing reset test pad. |

D2/U1 entries were stale: both were absent before this run. Dedicated latch pins are taken from the existing module symbol, not the obsolete U1 mapping. Manufacturer strapping/pin-limit documentation is unavailable locally; no unrelated GPIO assignment is changed.
