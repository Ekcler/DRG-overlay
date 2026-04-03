# DRG Overlay

Overlay builds for Deep Rock Galactic.

## Hotkeys

- **F5** - show/hide overlay
- **F6** - exit application
- **F7** - toggle language (RU/EN)

## Installation

```bash
npm install
```

## Run

```bash
npm start
```

## Build

```bash
npx electron-builder --win portable
```

## Structure

- `index.html` - main interface
- `builds.json` - builds data
- `main.js` - Electron main process
- `preload.js` - preload script
- `icons/`, `class_icons/`, `kloki png/` - icons

## License

MIT License - Copyright (c) 2026 Ekcler