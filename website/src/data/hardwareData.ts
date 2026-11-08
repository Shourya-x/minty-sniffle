export interface BomItem {
  refdes: string;
  value: string;
  footprint: string;
  mpn: string;
  category: 'IC / Module' | 'Power & Latch' | 'Passives' | 'Connectors & UI' | 'Test Points';
  subsystem: string;
  rationale: string;
}

export interface PinoutItem {
  refdes: string;
  pin: string;
  name: string;
  net: string;
  group: 'MCU (Module 1)' | 'Sensor & I2C Bus' | 'Soft Power Latch' | 'Power & Decoupling' | 'Debug & Test Points';
  notes: string;
}

export interface SubsystemSpec {
  id: string;
  code: string;
  title: string;
  summary: string;
  keySpecs: { label: string; value: string }[];
  details: string[];
  refs: string[];
}

export interface BuildLogChapter {
  phase: string;
  date: string;
  commitOrTag: string;
  title: string;
  subtitle: string;
  story: string[];
  QuoteOrTerminal?: string;
  highlights: string[];
  chatLink?: { label: string; url: string };
}

export const projectMeta = {
  documentNumber: 'MS-HW-2026-REV-A',
  title: 'Minty-Sniffle',
  subtitle: 'Ultra-Compact Coin-Cell BLE Environmental Node & Room Heatmapping Sensor',
  author: 'Shourya Pandey',
  website: 'https://shourya.page',
  github: 'https://github.com/Shourya-x/minty-sniffle',
  origin: 'R&D in Bharat 🇮🇳',
  status: 'REV. A — PCB & SCHEMATIC FINALIZED',
  date: 'August – October 2026',
  dimensions: '50 mm × 30 mm × 15 mm',
  powerSource: 'CR2477 (3.0 V Nominal, ~1000 mAh)',
  primaryMcu: 'ISC-nRF52840-A BLE 5.0 Module',
  sensor: 'Bosch BME680 / BME688 4-in-1 Environmental & Gas Sensor',
  memory: 'Infineon FM24CL16B-GTR 16-Kbit F-RAM (Non-Volatile)',
  rtc: 'SD3031 High-Precision I²C Real-Time Clock',
};

export const chatArchives = [
  {
    id: 'CHAT-01',
    platform: 'DeepSeek',
    title: 'Initial Architecture, Component Brainstorming & Spec Ideation',
    url: 'https://chat.deepseek.com/share/8zilebo0yilw8fv9bo',
    description: 'Early architecture planning, sensor/MCU selection, and coin-cell power budget ideation.',
  },
  {
    id: 'CHAT-02',
    platform: 'ChatGPT',
    title: 'KiCad 10 Setup on Fedora & CERN Library GitLab Debugging',
    url: 'https://chatgpt.com/share/6aef5177-bac0-83ec-b051-d65248966eb5',
    description: 'Setting up KiCad 10.0.6 on Fedora Linux and troubleshooting CERN library authentication.',
  },
  {
    id: 'CHAT-03',
    platform: 'ChatGPT',
    title: 'Copperhead.sh Setup, Indian Supplier Pivot & Altium-to-KiCad Module Import',
    url: 'https://chatgpt.com/share/6aef51a9-c7e0-83ee-af83-0a79c419743f',
    description: 'Configuring Copperhead v0.11.0 with Ollama/Codex, replacing Holyiot 18039 with ISC-nRF52840-A, emailing the vendor for Altium .PcbLib/.SchLib files, and importing them into KiCad 10.',
  },
  {
    id: 'CHAT-04',
    platform: 'ChatGPT',
    title: 'Soft-Power Latch Circuit, Manual PCB Routing, DRC Fixes & GND Copper Pours',
    url: 'https://chatgpt.com/share/6aef51c0-918c-83e8-a400-d96fe7dcb889',
    description: 'Sigrok PulseView logic analyzer setup, purging dual Flatpak/RPM KiCad installs, designing the AO3401A/2N7002/BAT54J soft-power latch, ditching FreeRouting to hand-route the PCB, fixing 50 DRC errors, and tuning solid GND copper pours.',
  },
];

export const buildLogChapters: BuildLogChapter[] = [
  {
    phase: 'CHAPTER 01',
    date: 'Aug 25 – Sep 12, 2026',
    commitOrTag: '249a1e6 → 8eb5d67 → Enclosure.FCStd',
    title: 'The Tic-Tac Box Challenge & Mechanical-First CAD in FreeCAD',
    subtitle: 'Defining a 50 × 30 × 15 mm coin-cell BLE environmental node before touching the schematic.',
    story: [
      'Minty-Sniffle started on August 25, 2026 with a strict mechanical constraint: pack an AI-capable Bosch VOC gas/environmental sensor (BME680/688), a long-range BLE 5.0 microcontroller (nRF52840), non-volatile memory, an RTC, and a 1000mAh CR2477 coin cell into a custom 3D-printed enclosure measuring just 50mm × 30mm × 15mm.',
      'On September 12, 2026 (18:46 to 21:04 IST), the mechanical enclosure was modeled first in FreeCAD 1.1 (Enclosure.FCStd) using a parametric Sketch → Pad → 1.0mm inward Thickness shell workflow, establishing the exact 48 × 28 mm internal PCB bay.',
    ],
    QuoteOrTerminal: 'Commit 8eb5d67: "Enhance README with project details and structure — Phase 1: MCAD physical bounding box (50x30x15mm)"',
    highlights: [
      'Locked physical envelope at 50.0 × 30.0 × 15.0 mm with 1.0 mm walls in FreeCAD 1.1',
      'Selected CR2477 (3V, ~1000mAh) in BH1000G holder buffered by 220µF bulk cap for BME680 heater pulses',
      'Added 16-Kbit F-RAM (FM24CL16B-GTR) + SD3031 hardware RTC on shared I²C bus',
    ],
    chatLink: {
      label: 'DeepSeek Architecture Chat ↗',
      url: 'https://chat.deepseek.com/share/8zilebo0yilw8fv9bo',
    },
  },
  {
    phase: 'CHAPTER 02',
    date: 'Sep 20, 2026',
    commitOrTag: 'eb3cee1 → 02a3514 → c8680cf → 8101152',
    title: 'KiCad 10 Library Hunts, The Altium Scare & Custom Holyiot Symbols',
    subtitle: 'Refusing to surrender to Altium Designer and building custom footprints from scratch on Fedora.',
    story: [
      'While setting up KiCad 10.0.6 on Fedora Linux, cloning the CERN KiCad library repo (gitlab.cern.ch/kicad/libraries/cernlib.git) threw unexpected GitLab credential prompts. Rather than getting blocked on external database libraries, custom project-local libraries were assembled for the BH1000G battery holder, Infineon FM24CL16B F-RAM, and SD3031 RTC.',
      'The first major roadblock hit with the original Holyiot YJ-18039 (nRF52840) BLE module: there were no clean ready-to-use KiCad symbols/footprints. At 21:09 IST (commit 02a3514), a backup commit was made literally titled "making a backup before shifting to altium".',
      'Barely 70 minutes later (22:19 IST, commit c8680cf), the Altium idea was scrapped completely ("i havent shifted to altium , and finally created and worked on the symbol and footprint of holyiot 18039") after hand-building the custom symbol and footprint directly in KiCad.',
    ],
    QuoteOrTerminal: 'Commit c8680cf (Sep 20, 22:19): "i havent shifted to altium , and finally created and worked on the symbol and footprint of holyiot 18039"',
    highlights: [
      'Built custom KiCad 10 symbol and footprint libraries for SD3031, FM24CL16B-GTR, and BH1000G',
      'Avoided switching to Altium Designer; kept the entire hardware stack 100% open-source in KiCad 10',
    ],
    chatLink: {
      label: 'ChatGPT #1: CERN Libraries & KiCad 10 ↗',
      url: 'https://chatgpt.com/share/6aef5177-bac0-83ec-b051-d65248966eb5',
    },
  },
  {
    phase: 'CHAPTER 03',
    date: 'Oct 04 – Oct 12, 2026',
    commitOrTag: '55c9cad • Copperhead v0.11.0',
    title: 'Enter Copperhead.sh, The Indian Supplier Pivot & Importing Vendor Altium Files',
    subtitle: 'Sourcing a real nRF52840 module in India, emailing the manufacturer for CAD files, and wiring with AI.',
    story: [
      'On October 4, Copperhead v0.11.0 ("Cursor for circuit boards") was set up on the ThinkPad (24GB RAM, Fedora Linux). After testing local Ollama (qwen2.5-coder:7b), Groq API keys, and OpenAI Codex CLI, a strict engineering spec (wire.md) was written so Copperhead could wire the passive subsystems and verify ERC.',
      'During component sourcing, reality hit: the Holyiot module and distributors like TME/Punoscho weren’t practical for local Indian procurement (checked Robu.in, Evelta, etc.). The design pivoted to the ISC-nRF52840-A BLE 5.0 module.',
      'The catch? The manufacturer only had Altium/OrCAD files off-web. After sending a formal engineering email explaining the self-funded freelance/R&D project, the vendor sent over the raw Altium package (ISC-nRF52840-A-MODULE.PcbLib, .SchLib, .PcbDoc, .SchDoc), which was directly imported and converted into native KiCad 10 libraries!',
    ],
    QuoteOrTerminal: '"man wait i do not want to shift to altium for fuck sake... okay i have got the files [from the vendor] — how to import the part in kicad 10"',
    highlights: [
      'Migrated MCU to ISC-nRF52840-A and converted vendor Altium .PcbLib/.SchLib into KiCad 10 format',
      'Caught a critical datasheet detail on U3 (FM24CL16B-GTR): pins 1–3 are hardware No-Connects (NC) in SOIC-8, not A0–A2 address straps',
      'Added 2.2MΩ / 1.0MΩ high-impedance battery divider (0.9375µA @ 3V) with 10nF reservoir cap C8 on P0.02',
    ],
    chatLink: {
      label: 'ChatGPT #2: Copperhead & Module Import ↗',
      url: 'https://chatgpt.com/share/6aef51a9-c7e0-83ee-af83-0a79c419743f',
    },
  },
  {
    phase: 'CHAPTER 04',
    date: 'Oct 13 – Oct 14 (Afternoon), 2026',
    commitOrTag: 'soft-latch branch • ERC: 0 Errors',
    title: 'Purging Dual Flatpak/RPM KiCad, Git Stash Rescue & The Soft-Power Latch',
    subtitle: 'Solving the 54-vs-143 ERC mystery and engineering a zero-contention MOSFET power latch.',
    story: [
      'While wiring the new ISC-nRF52840-A module manually, a bizarre bug appeared: KiCad’s GUI showed 54 ERC violations while Copperhead’s CLI reported 143 and couldn’t find sym-lib-table. Investigation revealed Fedora had two rival KiCad installations: Flatpak KiCad (10.0.7) and the Fedora Electronics Lab RPM (10.0.6)! After backing up plugins and themes, Flatpak KiCad was removed so GUI and CLI shared the exact same environment.',
      'Next came a major architectural upgrade: "I WANT AN SOFT LATCHING CIRCUIT." Instead of a hard mechanical power switch, a Circuit Cellar / Mosaic-style MCU soft-power latch was designed using an AO3401A high-side PMOS (Q1), 2N7002 NMOS hold driver (Q2), and three BAT54J Schottky diodes (D3–D5) controlled by P0.04 (PWR_HOLD) and P0.05 (PWR_BUTTON).',
      'When a failed git stash apply briefly threatened the manual schematic work, the board was recovered from a timestamped .zip backup, branched into soft-latch, and verified to 0 ERC errors with C9 (100nF) placed gate-to-source (preventing battery-insertion auto-start) and R11 (100kΩ) bleeding ghost voltage on SYS_VBAT.',
    ],
    QuoteOrTerminal: '"I WANT AN SOFT LATCHING CIRCUIT... p0.04 and p0.05 are the pins i have kept free on the main mcu, now make the prompt for copperhead to make this ckt in minty sniffle"',
    highlights: [
      'Set up 24MHz 8-Channel USB Logic Analyzer (CY7C68013A) with sigrok PulseView for I²C bus bring-up',
      'Engineered AO3401A + 2N7002 + triple BAT54J soft-power latch with runtime button sense on P0.05',
      'Added R11 (100kΩ) bleed load to clamp unpowered BAT_ADC divider injection to ≤0.164V',
    ],
    chatLink: {
      label: 'ChatGPT #3: Soft-Latch & Debugging ↗',
      url: 'https://chatgpt.com/share/6aef51c0-918c-83e8-a400-d96fe7dcb889',
    },
  },
  {
    phase: 'CHAPTER 05',
    date: 'Oct 14 – Nov 7, 2026',
    commitOrTag: 'f91bda2 → f7430a7 ("finally done")',
    title: 'Ditching FreeRouting, RF Antenna Edge Notch, Bottom Pocket Cap & JLCPCB Gerber Sign-Off',
    subtitle: 'Hand-routing 462 track segments & 45 vias across laptops, carving the 13.52×4.33mm RF notch, modeling bottom.FCStd, and generating JLCPCB Gerbers.',
    story: [
      'With the schematic 100% ERC-clean, layout moved to the PCB editor. After installing the 3GB kicad-packages3d library and custom STEP files (BH1000G, BME680, FM24CL16B, B3U-1000P) to verify 3D clearances, FreeRouting was briefly tested—and immediately rejected ("free router in fedora is fucking a lot of things"). Every single trace on Minty-Sniffle (462 copper segments and 45 vias) was hand-routed manually across Fedora and Windows.',
      'Running DRC initially flagged 50 violations: 25+ tracks were 0.150mm against a 0.200mm board minimum constraint, plus a 1.5mm line-width error on a graphic outline stroke. On the second laptop, all 50 track-width violations were eliminated (0 unconnected pads, 0 track-width errors), and a precision 13.52 × 4.33 mm RF antenna keepout notch was carved into the top edge of the 50.40 × 30.06 mm Edge.Cuts outline.',
      'Top and bottom copper zones were poured as solid stitched GND planes, the companion FreeCAD bottom base cap (bottom.FCStd — 52 × 32 × 5 mm with a 50.40 × 30.06 × 1.00 mm PCB seating pocket) was modeled, and the final pcb.step + JLCPCB fabrication archive (Minty-sniffle_0.0x0.0mm_for_JLCPCB.zip) were committed in f7430a7 ("finally done") with the "R&D in Bharat" silkscreen block.',
    ],
    QuoteOrTerminal: 'Commit f7430a7 ("finally done"): 462 hand-routed segments, 45 vias, 0 unconnected pads, 13.52×4.33mm RF antenna notch, bottom.FCStd pocket cap & JLCPCB Gerbers exported.',
    highlights: [
      'Ditched FreeRouting autorouter and manually routed 462 track segments and 45 stitching vias across 2 layers',
      'Eliminated all 50 track-width DRC errors and carved a 13.52 × 4.33 mm RF antenna clearance notch into Edge.Cuts',
      'Modeled bottom.FCStd (52×32×5mm base cap with 50.40×30.06mm pocket) and exported pcb.step + JLCPCB Gerbers',
    ],
    chatLink: {
      label: 'ChatGPT #3: Routing, DRC & Copper Pours ↗',
      url: 'https://chatgpt.com/share/6aef51c0-918c-83e8-a400-d96fe7dcb889',
    },
  },
];

export const keyParameters = [
  { parameter: 'Mechanical Envelope', symbol: 'L × W × H', min: '—', typ: '50 × 30 × 15', max: '—', unit: 'mm', conditions: 'FreeCAD 1.1 parametric shell (1.0 mm wall thickness)' },
  { parameter: 'Supply Voltage (Raw Battery)', symbol: 'V_BAT+', min: '2.0', typ: '3.0', max: '3.6', unit: 'V', conditions: 'CR2477 primary LiMnO2 cell in BH1000G holder' },
  { parameter: 'Switched System Rail', symbol: 'V_SYS_VBAT', min: '—', typ: '3.0', max: '3.6', unit: 'V', conditions: 'High-side switched via Q1 (AO3401A PMOS)' },
  { parameter: 'Bulk Energy Reservoir', symbol: 'C_BULK', min: '—', typ: '224.7', max: '—', unit: 'µF', conditions: 'C1 (220 µF) + C2 (4.7 µF) across SYS_VBAT for heater pulses' },
  { parameter: 'Battery Sense Divider Current', symbol: 'I_DIV', min: '—', typ: '0.9375', max: '1.125', unit: 'µA', conditions: 'R4 (2.2 MΩ) + R5 (1 MΩ) @ 3.0 V / 3.6 V' },
  { parameter: 'Battery Sense Scaling Ratio', symbol: 'K_ADC', min: '—', typ: '0.3125', max: '—', unit: 'V/V', conditions: 'V_BAT = V_ADC × 3.2 on P0.02 (τ = 6.875 ms with C8=10 nF)' },
  { parameter: 'Soft-Latch Active Hold Quiescent', symbol: 'I_LATCH_ON', min: '—', typ: '60', max: '90', unit: 'µA', conditions: 'R11 (30 µA) + R6 (~30 µA) + R7 (≤30 µA) @ 3.0 V' },
  { parameter: 'Residual OFF Rail Bound', symbol: 'V_SYS_OFF', min: '—', typ: '0.14', max: '0.164', unit: 'V', conditions: 'Divider-only injection clamped by R11 (100 kΩ) @ 3.6 V' },
  { parameter: 'Switched Rail Discharge Constant', symbol: 'τ_DISCH', min: '—', typ: '22.0', max: '—', unit: 's', conditions: 'C1 (220 µF) × R11 (100 kΩ) unloaded time constant' },
  { parameter: 'Shared I²C Bus Pull-Up', symbol: 'R_I2C', min: '—', typ: '4.7', max: '—', unit: 'kΩ', conditions: 'R1 (SDA) & R2 (SCL) pulled to SYS_VBAT' },
];

export const subsystems: SubsystemSpec[] = [
  {
    id: 'mcu',
    code: 'SYS-01',
    title: 'BLE Microcontroller Module (ISC-nRF52840-A)',
    summary: 'Selected after pivoting from the unavailable Holyiot 18039; imported directly from manufacturer Altium (.PcbLib/.SchLib) files into KiCad 10.',
    keySpecs: [
      { label: 'Designator', value: 'Module 1 (ISC-nRF52840-A)' },
      { label: 'Supply Rail', value: 'SYS_VBAT (Pin 14) + C7 100nF local + C2 4.7µF bulk' },
      { label: 'I²C Bus', value: 'P0.28 (SDA, Pin 8) / P0.29 (SCL, Pin 9)' },
      { label: 'Power Control', value: 'P0.04 (PWR_HOLD, Pin 12) / P0.05 (PWR_BUTTON, Pin 13)' },
    ],
    details: [
      'Retains the two-unit ISC-nRF52840-A module architecture with Ground returns on pins 1, 25, and 37.',
      'Asserts P0.04 (PWR_HOLD) HIGH early in boot sequence to latch Q1/Q2 power path on before momentary button SW3 is released.',
      'Monitors P0.05 (PWR_BUTTON, active LOW) during runtime to trigger graceful state save, F-RAM flush, BLE disconnect, and self-shutdown.',
      'Reads raw battery voltage on P0.02 (Pin 7, BAT_ADC) and drives status indicator on P0.22 (Pin 26, LED_GPIO).',
    ],
    refs: ['1', 'C2', 'C7'],
  },
  {
    id: 'latch',
    code: 'SYS-02',
    title: 'MCU-Controlled Soft Power Latch',
    summary: 'Circuit Cellar / Mosaic-inspired high-side PMOS/NMOS latching power switch with triple BAT54J Schottky isolation, button sense feedback, and ghost-voltage bleed protection.',
    keySpecs: [
      { label: 'High-Side Switch', value: 'Q1 AO3401A PMOS (BAT+ → SYS_VBAT)' },
      { label: 'Hold Driver', value: 'Q2 2N7002 NMOS driven via R9 (1kΩ) & D3' },
      { label: 'Isolation Diodes', value: 'D3, D4, D5 (BAT54J SOD-323 Schottky)' },
      { label: 'Gate / Rail Passives', value: 'R6, R7, R10, R11 (100kΩ), C9 (100nF G-S)' },
    ],
    details: [
      'Default OFF: R6 (100kΩ) and C9 (100nF) sit gate-to-source across Q1 (BAT+ to PMOS_GATE), preventing accidental battery-insertion turn-on pulses.',
      'Momentary Startup: Pressing SW3 pulls START_BUTTON to GND, sinking PMOS_GATE through D4 to turn on Q1 and energize SYS_VBAT.',
      'MCU Hold: Firmware drives P0.04 (PWR_HOLD) HIGH through R9 (1kΩ) and D3 into NMOS_GATE, turning on Q2 (2N7002) to keep PMOS_GATE low after SW3 release.',
      'Runtime Button Detection: D5 isolates the high battery-side node while allowing SW3 presses to pull P0.05 (PWR_BUTTON, pulled up to SYS_VBAT via R10=100kΩ) active LOW.',
      'Anti-Ghost Bleed: R11 (100kΩ across SYS_VBAT to GND) clamps residual voltage from the raw battery ADC divider to ≤0.164 V when OFF.',
    ],
    refs: ['Q1', 'Q2', 'D3', 'D4', 'D5', 'R6', 'R7', 'R9', 'R10', 'R11', 'C9', 'SW3'],
  },
  {
    id: 'sensor',
    code: 'SYS-03',
    title: 'Environmental & Gas Sensing (Bosch BME680 / BME688)',
    summary: '4-in-1 MEMS environmental node measuring VOC gas resistance, temperature, barometric pressure, and relative humidity for early fire precursor and room heatmap triangulation.',
    keySpecs: [
      { label: 'Designator', value: 'U2 (LGA-8 3×3mm)' },
      { label: 'Interface', value: 'I²C Mode (CSB Pin 2 tied to SYS_VBAT)' },
      { label: 'I²C Address', value: '0x76 (SDO Pin 5 strapped to GND)' },
      { label: 'Decoupling', value: 'C3 (100nF VDDIO) + C4 (100nF VDD) + C1 (220µF bulk)' },
    ],
    details: [
      'Duty-cycled hotplate heater pulses are buffered by the 220µF bulk capacitor (C1) across SYS_VBAT to prevent CR2477 internal resistance voltage droop.',
      'Shares the primary I²C bus (SDA on Pin 3, SCL on Pin 4) with 4.7kΩ pull-ups (R1, R2) to SYS_VBAT.',
      'Configured for I²C operation by strapping CSB (Pin 2) to SYS_VBAT and SDO (Pin 5) to GND.',
    ],
    refs: ['U2', 'C1', 'C3', 'C4', 'R1', 'R2'],
  },
  {
    id: 'memory-rtc',
    code: 'SYS-04',
    title: 'Non-Volatile F-RAM & Real-Time Clock (FM24CL16B + SD3031)',
    summary: 'Instant-write ferroelectric RAM and I²C hardware RTC enabling zero-wait-state state preservation prior to soft-latch shutdown and accurate timestamping.',
    keySpecs: [
      { label: 'F-RAM IC', value: 'U3 FM24CL16B-GTR (SOIC-8, I²C 0x50–0x57)' },
      { label: 'RTC IC', value: 'U4 SD3031 (SOIC-8, I²C 0x32)' },
      { label: 'Write Protect', value: 'U3 Pin 7 (WP) tied to GND (writes enabled)' },
      { label: 'Local Bypass', value: 'C5 (100nF for U3) + C6 (100nF for U4)' },
    ],
    details: [
      'F-RAM (U3) allows instantaneous non-volatile telemetry logging without the high page-erase current or latency of flash memory before cutting power on P0.04.',
      'U3 pins 1–3 are preserved as true hardware No-Connects (NC) matching the physical FM24CL16B symbol and silicon.',
      'SD3031 (U4) provides timekeeping on the shared SDA/SCL bus at address 0x32 (NFC intentionally omitted for power saving).',
    ],
    refs: ['U3', 'U4', 'C5', 'C6'],
  },
  {
    id: 'battery-adc',
    code: 'SYS-05',
    title: 'Ultra-Low-Leakage Battery Telemetry Divider',
    summary: '3.2MΩ total impedance resistive divider with charge-reservoir filtering for continuous CR2477 coin-cell health monitoring.',
    keySpecs: [
      { label: 'Upper / Lower', value: 'R4 = 2.2 MΩ (BAT+ → BAT_ADC) / R5 = 1.0 MΩ (BAT_ADC → GND)' },
      { label: 'Filter Capacitor', value: 'C8 = 10 nF (0603 ceramic ≥6.3V on P0.02)' },
      { label: 'Thevenin RC', value: 'R_TH = 687.5 kΩ, τ = 6.875 ms (≥50 ms firmware settle)' },
      { label: 'Continuous Draw', value: '0.9375 µA @ 3.0 V (1.125 µA @ 3.6 V)' },
    ],
    details: [
      'Measures raw BAT+ upstream of the PMOS switch Q1, routed to nRF52840 analog pin P0.02 (Pin 7).',
      'C8 (10 nF) acts as a local charge reservoir for the nRF52840 SAADC switched-capacitor input stage so high source impedance does not distort readings.',
      'Scaling factor: V_BAT+ = V_BAT_ADC × 3.2 (divider ratio = 1.0M / 3.2M = 0.3125).',
    ],
    refs: ['BT1', 'R4', 'R5', 'C8'],
  },
  {
    id: 'debug-ui',
    code: 'SYS-06',
    title: 'SWD Programming, User Controls & Logic Analyzer Test Pads',
    summary: 'Tag-Connect TC2030-IDC-NL 6-pin footprint, B3U-1000P tactile switches, status LED, and 7 dedicated 1.0mm probe pads for 24MHz USB Logic Analyzer debugging.',
    keySpecs: [
      { label: 'SWD Interface', value: 'J1 Tag-Connect TC2030 (SWDIO, SWCLK, RESET, SYS_VBAT, GND)' },
      { label: 'Tactile Switches', value: 'SW1 (User P0.12), SW2 (RESET P0.23), SW3 (Power Latch)' },
      { label: 'Status Indicator', value: 'D1 LED driven via R3 (1 kΩ) from P0.22 (LED_GPIO)' },
      { label: 'Test Points', value: 'TP1 (SYS_VBAT), TP2 (GND), TP3 (SDA), TP4 (SCL), TP5–TP7 (SWD/RST)' },
    ],
    details: [
      'Eliminates bulky pin headers inside the 50×30×15mm enclosure by using a zero-height Tag-Connect pogo footprint (J1).',
      'Every critical bus and power rail (SYS_VBAT, GND, SDA, SCL, SWDIO, SWCLK, RESET) is broken out to a 1.0mm test point (TP1–TP7) for sigrok PulseView 24MHz logic analyzer verification.',
    ],
    refs: ['J1', 'SW1', 'SW2', 'D1', 'R3', 'R8', 'TP1', 'TP2', 'TP3', 'TP4', 'TP5', 'TP6', 'TP7'],
  },
];

export const bomItems: BomItem[] = [
  { refdes: '1', value: 'ISC-nRF52840-A', footprint: 'ISC-nRF52840-MODULE', mpn: 'ISC-nRF52840-A', category: 'IC / Module', subsystem: 'MCU', rationale: 'Primary BLE 5.0 nRF52840 module (imported from vendor Altium libs); pins 12/13 support soft-power latch, pins 8/9 drive shared I²C.' },
  { refdes: 'U2', value: 'BME680', footprint: 'Bosch_LGA-8_3x3mm_P0.8mm', mpn: 'BME680 / BME688', category: 'IC / Module', subsystem: 'SENSOR', rationale: '4-in-1 environmental and VOC gas sensor on shared I²C bus (0x76 with SDO strapped to GND).' },
  { refdes: 'U3', value: 'FM24CL16B-GTR', footprint: 'SOIC-8', mpn: 'FM24CL16B-GTR', category: 'IC / Module', subsystem: 'MEMORY', rationale: '16-Kbit non-volatile F-RAM on I²C (0x50–0x57) for instant state logging prior to latch power-off.' },
  { refdes: 'U4', value: 'SD3031', footprint: 'SOIC-8_5.3x5.3mm_P1.27mm', mpn: 'SD3031', category: 'IC / Module', subsystem: 'RTC', rationale: 'Real-time clock on shared I²C bus (0x32) powered from SYS_VBAT.' },
  { refdes: 'Q1', value: 'AO3401A', footprint: 'SOT-23', mpn: 'AO3401A', category: 'Power & Latch', subsystem: 'MCU SOFT POWER LATCH', rationale: 'High-side P-channel MOSFET switching raw BAT+ (Source) to SYS_VBAT (Drain).' },
  { refdes: 'Q2', value: '2N7002', footprint: 'SOT-23', mpn: '2N7002', category: 'Power & Latch', subsystem: 'MCU SOFT POWER LATCH', rationale: 'Gate-sink N-channel MOSFET driven by PWR_HOLD to hold Q1 ON after button release.' },
  { refdes: 'D3', value: 'BAT54J', footprint: 'D_SOD-323', mpn: 'BAT54J', category: 'Power & Latch', subsystem: 'MCU SOFT POWER LATCH', rationale: 'BAT54-family Schottky diode isolating PWR_HOLD from NMOS_GATE.' },
  { refdes: 'D4', value: 'BAT54J', footprint: 'D_SOD-323', mpn: 'BAT54J', category: 'Power & Latch', subsystem: 'MCU SOFT POWER LATCH', rationale: 'BAT54-family Schottky diode allowing SW3 to sink PMOS_GATE independently of Q2.' },
  { refdes: 'D5', value: 'BAT54J', footprint: 'D_SOD-323', mpn: 'BAT54J', category: 'Power & Latch', subsystem: 'MCU SOFT POWER LATCH', rationale: 'BAT54-family Schottky diode blocking high battery-side button voltage from P0.05 (PWR_BUTTON).' },
  { refdes: 'BT1', value: 'BH1000G', footprint: 'BH1000G:BAT_BH1000G', mpn: 'BH1000G (CR2477)', category: 'Power & Latch', subsystem: 'BATTERY CONNECTOR', rationale: 'Coin-cell holder for 3V ~1000mAh CR2477 cell feeding BAT+ and common GND.' },
  { refdes: 'C1', value: '220uF', footprint: 'C_1206_3216Metric_HandSolder', mpn: '220uF Bulk Cap', category: 'Passives', subsystem: 'DECOUPLING CAPACITOR', rationale: 'Bulk energy reservoir across SYS_VBAT/GND to buffer BME680 heater pulses and BLE TX bursts.' },
  { refdes: 'C2', value: '4.7uF', footprint: 'C_1206_3216Metric_HandSolder', mpn: '4.7uF Ceramic 1206', category: 'Passives', subsystem: 'DECOUPLING CAPACITOR', rationale: 'Module bulk bypass across SYS_VBAT/GND.' },
  { refdes: 'C3', value: '100nF', footprint: 'C_1206_3216Metric_HandSolder', mpn: '100nF Ceramic 1206', category: 'Passives', subsystem: 'DECOUPLING CAPACITOR', rationale: 'Local supply decoupling for U2 (BME680 VDDIO).' },
  { refdes: 'C4', value: '100nF', footprint: 'C_1206_3216Metric_HandSolder', mpn: '100nF Ceramic 1206', category: 'Passives', subsystem: 'DECOUPLING CAPACITOR', rationale: 'Local supply decoupling for U2 (BME680 VDD).' },
  { refdes: 'C5', value: '100nF', footprint: 'C_1206_3216Metric_HandSolder', mpn: '100nF Ceramic 1206', category: 'Passives', subsystem: 'DECOUPLING CAPACITOR', rationale: 'Local supply decoupling for U3 (FM24CL16B F-RAM).' },
  { refdes: 'C6', value: '100nF', footprint: 'C_1206_3216Metric_HandSolder', mpn: '100nF Ceramic 1206', category: 'Passives', subsystem: 'DECOUPLING CAPACITOR', rationale: 'Local supply decoupling for U4 (SD3031 RTC).' },
  { refdes: 'C7', value: '100nF', footprint: 'C_1206_3216Metric_HandSolder', mpn: '100nF Ceramic 1206', category: 'Passives', subsystem: 'DECOUPLING CAPACITOR', rationale: 'Local supply decoupling for Module 1 (ISC-nRF52840-A SYS_VBAT).' },
  { refdes: 'C8', value: '10nF', footprint: 'C_1206_3216Metric_HandSolder', mpn: '10nF ≥6.3V 1206', category: 'Passives', subsystem: 'BATTERY DIVIDER', rationale: 'ADC sampling charge reservoir and low-pass filter on BAT_ADC (P0.02).' },
  { refdes: 'C9', value: '100nF', footprint: 'C_1206_3216Metric_HandSolder', mpn: '100nF ≥6.3V 1206', category: 'Passives', subsystem: 'MCU SOFT POWER LATCH', rationale: 'Gate-to-source startup/filter capacitor across BAT+ and PMOS_GATE; prevents insertion auto-start.' },
  { refdes: 'R1', value: '4.7k', footprint: 'R_1206_3216Metric_HandSolder', mpn: '4.7kΩ 1206', category: 'Passives', subsystem: 'I2C PULLUPS', rationale: 'Sole SDA pull-up resistor to switched SYS_VBAT rail.' },
  { refdes: 'R2', value: '4.7k', footprint: 'R_1206_3216Metric_HandSolder', mpn: '4.7kΩ 1206', category: 'Passives', subsystem: 'I2C PULLUPS', rationale: 'Sole SCL pull-up resistor to switched SYS_VBAT rail.' },
  { refdes: 'R3', value: '1k', footprint: 'R_1206_3216Metric_HandSolder', mpn: '1kΩ 1206', category: 'Passives', subsystem: 'STATUS LED', rationale: 'Series current-limiting resistor for status LED D1 driven by P0.22.' },
  { refdes: 'R4', value: '2.2M', footprint: 'R_1206_3216Metric_HandSolder', mpn: '2.2MΩ 1206', category: 'Passives', subsystem: 'BATTERY DIVIDER', rationale: 'High-impedance battery divider upper resistor (BAT+ to BAT_ADC).' },
  { refdes: 'R5', value: '1M', footprint: 'R_1206_3216Metric_HandSolder', mpn: '1.0MΩ 1206', category: 'Passives', subsystem: 'BATTERY DIVIDER', rationale: 'High-impedance battery divider lower resistor (BAT_ADC to GND).' },
  { refdes: 'R6', value: '100k', footprint: 'R_1206_3216Metric_HandSolder', mpn: '100kΩ 1206', category: 'Passives', subsystem: 'MCU SOFT POWER LATCH', rationale: 'PMOS gate-to-source pull-up resistor defaulting Q1 OFF.' },
  { refdes: 'R7', value: '100k', footprint: 'R_1206_3216Metric_HandSolder', mpn: '100kΩ 1206', category: 'Passives', subsystem: 'MCU SOFT POWER LATCH', rationale: 'NMOS gate pull-down resistor defaulting Q2 OFF during reset and shutdown.' },
  { refdes: 'R8', value: '10k', footprint: 'R_1206_3216Metric_HandSolder', mpn: '10kΩ 1206', category: 'Passives', subsystem: 'SWD / RESET', rationale: 'Reset pull-up resistor to SYS_VBAT.' },
  { refdes: 'R9', value: '1k', footprint: 'R_1206_3216Metric_HandSolder', mpn: '1kΩ 1206', category: 'Passives', subsystem: 'MCU SOFT POWER LATCH', rationale: 'Series current-limiting resistor from P0.04 (PWR_HOLD) to D3 anode (HOLD_DRIVE).' },
  { refdes: 'R10', value: '100k', footprint: 'R_1206_3216Metric_HandSolder', mpn: '100kΩ 1206', category: 'Passives', subsystem: 'MCU SOFT POWER LATCH', rationale: 'Pull-up resistor on PWR_BUTTON (P0.05) to switched SYS_VBAT rail only (no battery backfeed).' },
  { refdes: 'R11', value: '100k', footprint: 'R_1206_3216Metric_HandSolder', mpn: '100kΩ 1206', category: 'Passives', subsystem: 'MCU SOFT POWER LATCH', rationale: 'Switched-rail bleed load limiting BAT_ADC ghost voltage to ≤0.164V when OFF.' },
  { refdes: 'D1', value: 'LED', footprint: 'LED_1206_3216Metric_HandSolder', mpn: 'Status LED 1206', category: 'Connectors & UI', subsystem: 'STATUS LED', rationale: 'Visual status indicator driven by LED_GPIO (P0.22) through R3.' },
  { refdes: 'SW1', value: 'SW_Push', footprint: 'B3U-1000P', mpn: 'Omron B3U-1000P', category: 'Connectors & UI', subsystem: 'STATUS LED', rationale: 'User input ultra-compact tactile pushbutton connected to P0.12 (BUTTON, active LOW).' },
  { refdes: 'SW2', value: 'SW_Push', footprint: 'B3U-1000P', mpn: 'Omron B3U-1000P', category: 'Connectors & UI', subsystem: 'SWD / RESET', rationale: 'Hardware reset tactile switch on RESET node (P0.23).' },
  { refdes: 'SW3', value: 'SW_Push', footprint: 'B3U-1000P', mpn: 'Omron B3U-1000P', category: 'Connectors & UI', subsystem: 'MCU SOFT POWER LATCH', rationale: 'Dedicated normally-open momentary power button grounding START_BUTTON.' },
  { refdes: 'J1', value: 'TC2030', footprint: 'Tag-Connect_TC2030-IDC-NL_2x03_P1.27mm', mpn: 'TC2030-IDC-NL', category: 'Connectors & UI', subsystem: 'SWD / RESET', rationale: '6-pin no-legs Tag-Connect SWD programming interface.' },
  { refdes: 'H1–H4', value: 'MountingHole', footprint: 'MountingHole_2.2mm_M2', mpn: 'M2 NPTH / Standoff', category: 'Connectors & UI', subsystem: 'MECHANICAL', rationale: 'Four corner M2 mounting holes (2.2mm drill) for enclosure alignment.' },
  { refdes: 'TP1', value: 'SYS_VBAT', footprint: 'TestPoint_Pad_D1.0mm', mpn: '1.0mm Test Pad', category: 'Test Points', subsystem: 'TESTING POINTS', rationale: 'Switched system supply rail probe point.' },
  { refdes: 'TP2', value: 'GND', footprint: 'TestPoint_Pad_D1.0mm', mpn: '1.0mm Test Pad', category: 'Test Points', subsystem: 'TESTING POINTS', rationale: 'Common ground reference probe point.' },
  { refdes: 'TP3', value: 'SDA', footprint: 'TestPoint_Pad_D1.0mm', mpn: '1.0mm Test Pad', category: 'Test Points', subsystem: 'TESTING POINTS', rationale: 'I²C serial data probe point for 24MHz USB Logic Analyzer.' },
  { refdes: 'TP4', value: 'SCL', footprint: 'TestPoint_Pad_D1.0mm', mpn: '1.0mm Test Pad', category: 'Test Points', subsystem: 'TESTING POINTS', rationale: 'I²C serial clock probe point for 24MHz USB Logic Analyzer.' },
  { refdes: 'TP5', value: 'SWDIO', footprint: 'TestPoint_Pad_D1.0mm', mpn: '1.0mm Test Pad', category: 'Test Points', subsystem: 'TESTING POINTS', rationale: 'SWD data I/O probe point.' },
  { refdes: 'TP6', value: 'SWCLK', footprint: 'TestPoint_Pad_D1.0mm', mpn: '1.0mm Test Pad', category: 'Test Points', subsystem: 'TESTING POINTS', rationale: 'SWD clock probe point.' },
  { refdes: 'TP7', value: 'RESET', footprint: 'TestPoint_Pad_D1.0mm', mpn: '1.0mm Test Pad', category: 'Test Points', subsystem: 'TESTING POINTS', rationale: 'MCU reset net probe point.' },
];

export const pinoutItems: PinoutItem[] = [
  // MCU Module 1
  { refdes: '1 (nRF52840)', pin: '1, 25, 37', name: 'GND', net: 'GND', group: 'MCU (Module 1)', notes: 'Module common ground return pins.' },
  { refdes: '1 (nRF52840)', pin: '14', name: 'VDD_NRF', net: 'SYS_VBAT', group: 'MCU (Module 1)', notes: 'Switched system rail supply input (decoupled by C7=100nF & C2=4.7µF).' },
  { refdes: '1 (nRF52840)', pin: '7', name: 'P0.02 / AIN0', net: 'BAT_ADC', group: 'MCU (Module 1)', notes: 'SAADC analog input sensing raw battery divider midpoint (×3.2 scaling).' },
  { refdes: '1 (nRF52840)', pin: '8', name: 'P0.28', net: 'SDA', group: 'MCU (Module 1)', notes: 'Primary I²C serial data line (4.7kΩ pull-up R1 to SYS_VBAT).' },
  { refdes: '1 (nRF52840)', pin: '9', name: 'P0.29', net: 'SCL', group: 'MCU (Module 1)', notes: 'Primary I²C serial clock line (4.7kΩ pull-up R2 to SYS_VBAT).' },
  { refdes: '1 (nRF52840)', pin: '12', name: 'P0.04', net: 'PWR_HOLD', group: 'MCU (Module 1)', notes: 'Dedicated soft-latch output; assert HIGH early in boot to hold Q1/Q2 ON.' },
  { refdes: '1 (nRF52840)', pin: '13', name: 'P0.05', net: 'PWR_BUTTON', group: 'MCU (Module 1)', notes: 'Dedicated active-LOW power button sense input isolated via D5.' },
  { refdes: '1 (nRF52840)', pin: '17', name: 'P0.12', net: 'BUTTON', group: 'MCU (Module 1)', notes: 'User tactile button SW1 input (requires firmware internal pull-up).' },
  { refdes: '1 (nRF52840)', pin: '21', name: 'P0.23', net: 'RESET', group: 'MCU (Module 1)', notes: 'Reset line pulled up via R8 (10kΩ) to SYS_VBAT and routed to J1/SW2/TP7.' },
  { refdes: '1 (nRF52840)', pin: '26', name: 'P0.22', net: 'LED_GPIO', group: 'MCU (Module 1)', notes: 'Status LED output driving D1 anode via R3 (1kΩ).' },
  { refdes: '1 (nRF52840)', pin: '31', name: 'SWDCLK', net: 'SWCLK', group: 'MCU (Module 1)', notes: 'ARM Serial Wire Debug clock to J1 Pin 4 & TP6.' },
  { refdes: '1 (nRF52840)', pin: '32', name: 'SWDIO', net: 'SWDIO', group: 'MCU (Module 1)', notes: 'ARM Serial Wire Debug data I/O to J1 Pin 2 & TP5.' },

  // Sensor & I2C Bus
  { refdes: 'U2 (BME680)', pin: '1, 7', name: 'GND', net: 'GND', group: 'Sensor & I2C Bus', notes: 'Sensor ground returns.' },
  { refdes: 'U2 (BME680)', pin: '2', name: 'CSB', net: 'SYS_VBAT', group: 'Sensor & I2C Bus', notes: 'Tied HIGH to SYS_VBAT to select I²C interface mode.' },
  { refdes: 'U2 (BME680)', pin: '3', name: 'SDI', net: 'SDA', group: 'Sensor & I2C Bus', notes: 'Shared I²C data line.' },
  { refdes: 'U2 (BME680)', pin: '4', name: 'SCK', net: 'SCL', group: 'Sensor & I2C Bus', notes: 'Shared I²C clock line.' },
  { refdes: 'U2 (BME680)', pin: '5', name: 'SDO', net: 'GND', group: 'Sensor & I2C Bus', notes: 'Strapped to GND to select I²C address 0x76.' },
  { refdes: 'U2 (BME680)', pin: '6, 8', name: 'VDDIO, VDD', net: 'SYS_VBAT', group: 'Sensor & I2C Bus', notes: 'Logic and sensor supplies decoupled by C3 & C4 (100nF each).' },
  { refdes: 'U3 (FM24CL16B)', pin: '1, 2, 3', name: 'NC', net: 'NC', group: 'Sensor & I2C Bus', notes: 'Hardware No-Connect pins on FM24CL16B SOIC-8 package.' },
  { refdes: 'U3 (FM24CL16B)', pin: '4', name: 'VSS', net: 'GND', group: 'Sensor & I2C Bus', notes: 'F-RAM ground return.' },
  { refdes: 'U3 (FM24CL16B)', pin: '5, 6', name: 'SDA, SCL', net: 'SDA / SCL', group: 'Sensor & I2C Bus', notes: 'Shared I²C interface (device address range 0x50–0x57).' },
  { refdes: 'U3 (FM24CL16B)', pin: '7', name: 'WP', net: 'GND', group: 'Sensor & I2C Bus', notes: 'Write-protect tied to GND to enable F-RAM write operations.' },
  { refdes: 'U3 (FM24CL16B)', pin: '8', name: 'VDD', net: 'SYS_VBAT', group: 'Sensor & I2C Bus', notes: 'F-RAM power rail decoupled by C5 (100nF).' },
  { refdes: 'U4 (SD3031)', pin: '2, 5', name: 'Vdd, Gnd', net: 'SYS_VBAT / GND', group: 'Sensor & I2C Bus', notes: 'RTC supply and return decoupled by C6 (100nF).' },
  { refdes: 'U4 (SD3031)', pin: '7, 8', name: 'Sda, Scl', net: 'SDA / SCL', group: 'Sensor & I2C Bus', notes: 'Shared I²C bus (RTC address 0x32).' },

  // Soft Power Latch
  { refdes: 'Q1 (AO3401A)', pin: '1 (G), 2 (S), 3 (D)', name: 'G / S / D', net: 'PMOS_GATE / BAT+ / SYS_VBAT', group: 'Soft Power Latch', notes: 'High-side PMOS power switch controlled by PMOS_GATE.' },
  { refdes: 'Q2 (2N7002)', pin: '1 (G), 2 (S), 3 (D)', name: 'G / S / D', net: 'NMOS_GATE / GND / PMOS_GATE', group: 'Soft Power Latch', notes: 'N-channel hold transistor sinking PMOS_GATE when NMOS_GATE is driven HIGH.' },
  { refdes: 'D3 (BAT54J)', pin: '2 (A) → 1 (K)', name: 'A → K', net: 'HOLD_DRIVE → NMOS_GATE', group: 'Soft Power Latch', notes: 'Schottky diode isolating MCU P0.04 hold output from Q2 gate.' },
  { refdes: 'D4 (BAT54J)', pin: '2 (A) → 1 (K)', name: 'A → K', net: 'PMOS_GATE → START_BUTTON', group: 'Soft Power Latch', notes: 'Schottky diode sinking PMOS_GATE to GND when SW3 is pressed.' },
  { refdes: 'D5 (BAT54J)', pin: '2 (A) → 1 (K)', name: 'A → K', net: 'PWR_BUTTON → START_BUTTON', group: 'Soft Power Latch', notes: 'Schottky diode blocking battery-side voltage from P0.05 while allowing active-LOW press detection.' },
  { refdes: 'SW3', pin: '1, 2', name: '1, 2', net: 'START_BUTTON / GND', group: 'Soft Power Latch', notes: 'Momentary normally-open power button initiating startup and runtime power-off request.' },

  // Power & Decoupling
  { refdes: 'BT1 (BH1000G)', pin: 'P, N', name: 'POS, NEG', net: 'BAT+ / GND', group: 'Power & Decoupling', notes: 'CR2477 coin-cell battery holder terminals.' },
  { refdes: 'R4 / R5 / C8', pin: 'Divider', name: 'BAT_ADC Network', net: 'BAT+ → BAT_ADC → GND', group: 'Power & Decoupling', notes: '2.2MΩ upper (R4), 1MΩ lower (R5), and 10nF reservoir (C8) feeding P0.02.' },
  { refdes: 'C1, C2, C3–C7', pin: '1, 2', name: 'Decoupling Bank', net: 'SYS_VBAT / GND', group: 'Power & Decoupling', notes: '220µF bulk (C1), 4.7µF module bulk (C2), and five 100nF local IC bypass caps (C3–C7).' },

  // Debug & Test Points
  { refdes: 'J1 (TC2030)', pin: '1–6', name: 'Tag-Connect SWD', net: 'SYS_VBAT, SWDIO, RESET, SWCLK, GND, NC', group: 'Debug & Test Points', notes: '6-pin spring-pin programming header footprint.' },
  { refdes: 'TP1 – TP7', pin: '1', name: 'Test Pad Array', net: 'SYS_VBAT, GND, SDA, SCL, SWDIO, SWCLK, RESET', group: 'Debug & Test Points', notes: '1.0mm diameter surface probe pads for oscilloscope and 24MHz USB logic analyzer verification.' },
];
