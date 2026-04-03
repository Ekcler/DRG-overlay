const { app, BrowserWindow, globalShortcut, ipcMain, screen } = require('electron');
const path = require('path');
const fs = require('fs');

app.commandLine.appendSwitch('force-device-scale-factor', '1');
app.commandLine.appendSwitch('high-dpi-support', '1');

let mainWindow = null;
let isVisible = false;

function createWindow() {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;
  
  mainWindow = new BrowserWindow({
    width: 616,
    height: 820,
    minWidth: 616,
    minHeight: 820,
    maxWidth: 616,
    maxHeight: 820,
    x: width - 620,
    y: 80,
    icon: path.join(__dirname, 'icoz.ico'),
    transparent: false,
    frame: false,
    alwaysOnTop: true,
    hasShadow: false,
    resizable: false,
    skipTaskbar: false,
    show: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      zoomFactor: 1.0
    }
  });
  
  mainWindow.setMovable(true);
  
  mainWindow.setIgnoreMouseEvents(true, { forward: true });
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.setAlwaysOnTop(true, 'screen-saver');
  mainWindow.loadFile('index.html');
  
  mainWindow.on('moved', () => {
    mainWindow.webContents.send('window-resized');
  });
  
  mainWindow.on('resized', () => {
    mainWindow.webContents.send('window-resized');
  });
}

function loadBuilds() {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'builds.json'), 'utf8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function loadSettings() {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'settings.json'), 'utf8');
    return JSON.parse(data);
  } catch {
    return { position: 'top-right', width: 616, height: 739 };
  }
}

function saveSettings(settings) {
   try {
     // Merge with existing settings to avoid losing other fields
     const existing = {};
     try {
       const data = fs.readFileSync(path.join(__dirname, 'settings.json'), 'utf8');
       Object.assign(existing, JSON.parse(data));
     } catch (e) {
       // If file doesn't exist or invalid, start with defaults
     }
     const toWrite = { ...existing, ...settings };
     fs.writeFileSync(path.join(__dirname, 'settings.json'), JSON.stringify(toWrite, null, 2));
   } catch (e) {
     console.error('Failed to save settings:', e);
   }
 }

function toggleOverlay() {
  if (!mainWindow) return;
  
  if (isVisible) {
    mainWindow.webContents.send('animate-hide');
    mainWindow.setIgnoreMouseEvents(false);
    setTimeout(() => {
      mainWindow.hide();
      mainWindow.blur();
    }, 50);
    isVisible = false;
  } else {
    mainWindow.webContents.send('animate-show');
    setTimeout(() => {
      mainWindow.show();
      mainWindow.focus();
      mainWindow.setIgnoreMouseEvents(false);
    }, 50);
    isVisible = true;
  }
}

function hideOverlay() {
  if (!mainWindow || !isVisible) return;
  mainWindow.webContents.send('animate-hide');
  mainWindow.setIgnoreMouseEvents(false);
  setTimeout(() => {
    mainWindow.hide();
    mainWindow.blur();
  }, 50);
  isVisible = false;
}

app.whenReady().then(() => {
  isVisible = true;
  createWindow();

  globalShortcut.register('F5', toggleOverlay);
  globalShortcut.register('F6', () => app.quit());
  globalShortcut.register('F7', () => {
    if (mainWindow) mainWindow.webContents.send('toggle-lang');
  });

  ipcMain.handle('get-builds', () => loadBuilds());
  ipcMain.handle('get-settings', () => loadSettings());
  ipcMain.on('update-settings', (event, settings) => saveSettings(settings));
  ipcMain.on('hide-overlay', hideOverlay);
  
  ipcMain.on('set-click-through', (event, enable) => {
    mainWindow.setIgnoreMouseEvents(enable, { forward: true });
  });
  
  ipcMain.on('move-window', (event, x, y) => {
    if (mainWindow) {
      mainWindow.setPosition(Math.round(x), Math.round(y));
    }
  });
  
  ipcMain.on('move-by', (event, dx, dy) => {
    if (mainWindow) {
      const [x, y] = mainWindow.getPosition();
      mainWindow.setPosition(x + Math.round(dx), y + Math.round(dy));
    }
  });
  
  ipcMain.handle('get-window-position', () => {
    if (mainWindow) {
      return mainWindow.getPosition();
    }
    return [0, 0];
  });
  
  ipcMain.on('start-drag', () => {
    if (mainWindow) {
      mainWindow.webContents.startDragging();
    }
  });
  
  ipcMain.on('start-dragging', () => {
    if (mainWindow && mainWindow.webContents) {
      mainWindow.webContents.executeJavaScript('window.startDragging && window.startDragging()').catch(() => {});
    }
  });
  
  ipcMain.on('update-hotkeys', (event, hotkeys) => {
    globalShortcut.unregisterAll();
    
    const validKey = (key) => {
      if (!key || typeof key !== 'string') return false;
      if (/^[A-Z0-9]$/.test(key)) return true;
      const validSpecial = ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','F13','F14','F15','F16','F17','F18','F19','F20','F21','F22','F23','F24','Space','Tab','Enter','Backspace','Delete','Insert','Return','Up','Down','Left','Right','Home','End','PageUp','PageDown','Escape','PrintScreen','VolumeUp','VolumeDown','VolumeMute','MediaNextTrack','MediaPreviousTrack','MediaStop','MediaPlayPause'];
      return validSpecial.includes(key);
    };
    
    const safeRegister = (accelerator, callback) => {
      try {
        if (validKey(accelerator)) {
          globalShortcut.register(accelerator, callback);
        }
      } catch (e) {
        console.error('Failed to register hotkey:', accelerator, e);
      }
    };
    
    safeRegister(hotkeys.show, toggleOverlay);
    safeRegister(hotkeys.exit, () => app.quit());
    safeRegister(hotkeys.lang, () => {
      if (mainWindow) mainWindow.webContents.send('toggle-lang');
    });
  });
  
  ipcMain.on('unregister-hotkeys', () => {
    globalShortcut.unregisterAll();
  });
});

app.on('will-quit', () => globalShortcut.unregisterAll());
app.on('window-all-closed', () => app.quit());
