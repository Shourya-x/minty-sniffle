# 🍬👃 Minty-Sniffle

**Ultra-compact, coin-cell-powered BLE environmental node for continuous room heatmapping and fire detection.**

## Overview
Minty-Sniffle is a hardware engineering challenge designed from CAD to ECAD in a single day. The goal is to pack an AI-enabled gas sensor, a Bluetooth Low Energy (BLE) microcontroller, and a high-capacity coin cell battery into a custom 3D-printed enclosure measuring just 50mm x 30mm x 15mm (a slightly beefed-up Tic Tac box). 

By deploying multiple Minty-Sniffle nodes across a space, the network can triangulate gas leaks, detect early-stage fires, and generate real-time environmental heatmaps via BLE mesh communication.

## Hardware Architecture
*   **Microcontroller:** nRF52840 (or nRF52833) for ultra-low-power BLE and long-range coded PHY.
*   **Gas Sensor:** Bosch BME688 (4-in-1 AI gas, pressure, temperature, and humidity sensor).
*   **Power Source:** CR2477 Coin Cell Battery (3V, ~1000mAh) with a large bypass capacitor to handle BME688 heater pulses without browning out the MCU.
*   **Enclosure:** Custom 3D printed shell with dedicated airflow channels and louvers for maximum sensor exposure.

## Key Features
*   **AI Gas Scanning:** Utilizing BME AI-Studio to train the sensor to recognize specific VOC footprints and fire precursors.
*   **Duty-Cycled Power:** Sensor heater is pulsed optimally to allow months of continuous run time on a single CR2477.
*   **BLE Mesh Ready:** Nodes broadcast sensor payloads to a central gateway for room-scale heatmapping.

## Repository Structure (Planned)
*   `/Hardware/ECAD/` - Schematic and PCB layout files (KiCad/Altium).
*   `/Hardware/MCAD/` - 3D STEP files and STL files for the mini 3D printer.
*   `/Firmware/` - nRF52 C/C++ source code, BLE stack configurations, and BME688 driver integration.
*   `/Docs/` - Datasheets, power consumption calculations, and AI training datasets.

## Development Sprint Log
- **Phase 1:** MCAD physical bounding box and DXF export (50x30x15mm).
- **Phase 2:** ECAD schematic capture (nRF52 + BME688 + CR2477 power delivery).
- **Phase 3:** PCB layout, thermal isolation of the sensor, and component placement.
- **Phase 4:** MCAD enclosure detailing (ventilation design, snap-fits).

---
*Created by Shourya Pandey*
