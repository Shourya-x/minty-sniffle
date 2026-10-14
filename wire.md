# MINTY-SNIFFLE IMPLEMENTATION SPECIFICATION

This document is the governing implementation specification for the Minty-Sniffle hardware project.

The hardware architecture has already been designed and the component selection has already been verified by the engineer.

The objective is implementation, completion, cleanup and verification.

----------------------------------------------------
DESIGN AUTHORITY
----------------------------------------------------

Priority order:

1. This document
2. Existing KiCad schematic
3. Existing project documentation
4. Datasheet markdowns (only if implementation details are missing)

Do not redesign the project.

Do not question already selected components.

Do not perform architecture reviews.

Do not suggest alternative ICs.

Do not halt because a different component might be better.

----------------------------------------------------
GENERAL RULES
----------------------------------------------------

Do not rename components.

Do not renumber references.

Do not replace components.

Do not change footprints unless clearly incorrect.

Do not change MCU GPIO assignments that already exist.

Do not redesign the power architecture.

Do not modify manually completed wiring.

Only implement missing circuitry.

Only add passive components.

Only add standard engineering circuitry.

Keep schematic clean.

Use global power symbols.

Use net labels instead of unnecessary long wires.

----------------------------------------------------
IMPLEMENTATION TASKS
----------------------------------------------------

Complete all unfinished hardware.

Including:

• Decoupling capacitors
• Bulk capacitors
• Power distribution
• Pull-ups
• Pull-downs
• Battery divider
• SWD connector
• Test points
• Reset circuitry
• Standard passive components
• Net labels
• ERC cleanup
• Documentation synchronization

The current user request supersedes this earlier latch exclusion only for the AO3401A/2N7002/BAT54-family soft-power latch. Use P0.04=PWR_HOLD and P0.05=PWR_BUTTON; label raw battery BAT+ and the existing VDD distribution SYS_VBAT. Preserve all other subsystems and GPIO assignments. The PCB is unchanged. Firmware asserts HOLD early in boot and releases it after saving state, finishing flash writes, disconnecting BLE and releasing the power button.

The MCU subsystem is being wired manually.

Do not alter existing MCU GPIO assignments.

----------------------------------------------------
DECOUPLING RULES
----------------------------------------------------

Every IC shall receive local decoupling.

Use one 100 nF capacitor per IC supply.

Place capacitors adjacent to each device.

Add appropriate bulk capacitance on the VDD rail.

Use engineering judgement for capacitor values.

----------------------------------------------------
SWD
----------------------------------------------------

Expose

SWDIO

SWCLK

RESET

VDD

GND

using a Tag-Connect compatible programming interface unless another programming connector already exists.

----------------------------------------------------
BATTERY MEASUREMENT
----------------------------------------------------

Implement a high impedance resistor divider.

Minimize quiescent current.

Connect to an unused ADC capable GPIO.

----------------------------------------------------
TEST POINTS
----------------------------------------------------

Add test pads for

VDD

GND

SDA

SCL

SWDIO

SWCLK

RESET

----------------------------------------------------
WORKFLOW
----------------------------------------------------

For each subsystem

1. Inspect only files required for that subsystem.
2. Implement missing circuitry.
3. Run ERC.
4. Automatically resolve all non-ambiguous ERC issues.
5. Continue.

Do not stop after each subsystem.

Continue until all implementation work is complete.

----------------------------------------------------
STOP ONLY IF
----------------------------------------------------

Stop only if

• Required project files are missing.

• A required symbol or footprint does not exist.

• A connection cannot be inferred from the existing schematic.

Do not stop because of engineering recommendations.

Do not stop because an alternative implementation exists.

Do not stop because a component has a better substitute.

----------------------------------------------------
PROJECT COMPLETE WHEN
----------------------------------------------------

Project completion requires

• All components wired.

• All passive support circuitry added.

• SWD completed.

• Battery measurement completed.

• Test points completed.

• Documentation updated.

• ERC free of non-ambiguous issues.

The objective is implementation, not design review.
