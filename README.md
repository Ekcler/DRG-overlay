# DRG Overlay

🪨 A lightweight overlay for Deep Rock Galactic that displays weapon and class builds on top of the game.

<p align="center">
  <a href="./README.md">🇬🇧 English</a> | <a href="./README-ru.md">🇷🇺 Русский</a>
</p>

![Interface Screenshot](interface/inerface.png)

## What is this for

Instead of minimizing the game or searching for guides in a browser, this overlay gives you instant access to the information you need without interrupting your gameplay.

## Features

- **Always on top** — the window stays above all applications, including fullscreen mode.
- **Builds database** — detailed weapon configurations for all four classes:
  - Gunner
  - Scout
  - Driller
  - Engineer
- **Language switch** — interface available in Russian and English (F7).
- **Draggable window** — move the overlay to any part of the screen with your mouse.
- **Click-through mode** — when inactive, clicks pass through the window directly into the game.
- **Custom hotkeys** — change hotkeys to your preference right from the interface.
- **Position memory** — the window reopens in the same position where you left it.
- **Stylish interface** — dark theme matching the game's style with icons and animations.
- **Portable** — can be built into a single `.exe` file and run without Node.js installed.

## Hotkeys

- **F5** — show or hide the overlay
- **F6** — exit the application
- **F7** — toggle language (Russian / English)

## Installation and Running

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run:
   ```bash
   npm start
   ```

## Build

To create a portable `.exe` version:
```bash
npm run build
```
The output file will be in the `dist` folder.

## License

MIT License — Copyright (c) 2026 Ekcler
