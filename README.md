# DRG Overlay

Оверлей билдов для Deep Rock Galactic.

## Хоткеи

- **F5** - показать/скрыть оверлей
- **F6** - выход из приложения
- **F7** - переключить язык (RU/EN)

## Установка

```bash
npm install
```

## Запуск

```bash
npm start
```

## Билд

```bash
npx electron-builder --win portable
```

## Структура

- `index.html` - основной интерфейс
- `builds.json` - данные билдов
- `main.js` - Electron процесс
- `preload.js` - прелоад скрипт
- `icons/`, `class_icons/`, `kloki png/` - иконки