# DRG Overlay / DRG Оверлей

Overlay builds for Deep Rock Galactic. / Оверлей билдов для Deep Rock Galactic.

## Hotkeys / Хоткеи

- **F5** - show/hide overlay / показать/скрыть оверлей
- **F6** - exit application / выход из приложения
- **F7** - toggle language (RU/EN) / переключить язык

## Installation / Установка

```bash
npm install
```

## Run / Запуск

```bash
npm start
```

## Build / Билд

```bash
npx electron-builder --win portable
```

## Structure / Структура

- `index.html` - main interface / основной интерфейс
- `builds.json` - builds data / данные билдов
- `main.js` - Electron main process / Electron процесс
- `preload.js` - preload script / прелоад скрипт
- `icons/`, `class_icons/`, `kloki png/` - icons / иконки

## License

MIT License - Copyright (c) 2026 Ekcler