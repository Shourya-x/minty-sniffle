# Proposal: wire-led-and-switch

> Marker: AUTO (autonomous mode; auto-approved, reviewable after the fact)

## Why

Complete the LED and switch circuits specified in wire.md using existing components and explicitly provisional MCU GPIO choices.

## What Changes

- Set R3 to 1k; connect U1.10 (P0.30) through R3 to D1.2 anode, and D1.1 cathode to GND. Use LED_GPIO and LED_A net names.
- Connect SW1.1 to U1.11 (P0.31) on BUTTON; connect SW1.2 to GND. Document firmware internal pull-up requirement.
- Preserve symbol placement and pin definitions; GPIO suitability remains UNVERIFIED under the user's authorization.
- Update BOM, PINOUT, SPEC, SUBSYSTEMS and decision log.
- Leave RTC backup/interrupt, C7 and R4-R7 pending documented function; do not invent connections or declare them intentionally unused merely to clear ERC. SWD test points and buzzer are absent.
