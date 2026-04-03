const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getBuilds: () => ipcRenderer.invoke('get-builds'),
  getSettings: () => ipcRenderer.invoke('get-settings'),
  hideOverlay: () => ipcRenderer.send('hide-overlay'),
  updateSettings: (settings) => ipcRenderer.send('update-settings', settings),
  updateHotkeys: (hotkeys) => ipcRenderer.send('update-hotkeys', hotkeys),
  unregisterHotkeys: () => ipcRenderer.send('unregister-hotkeys'),
  setClickThrough: (enable) => ipcRenderer.send('set-click-through', enable),
  moveWindow: (x, y) => ipcRenderer.send('move-window', x, y),
  moveBy: (dx, dy) => ipcRenderer.send('move-by', dx, dy),
  getWindowPosition: () => ipcRenderer.invoke('get-window-position'),
  startDrag: () => ipcRenderer.send('start-drag'),
  startDragging: () => ipcRenderer.send('start-dragging'),
  onAnimateShow: (callback) => ipcRenderer.on('animate-show', callback),
  onAnimateHide: (callback) => ipcRenderer.on('animate-hide', callback),
  onToggleLang: (callback) => ipcRenderer.on('toggle-lang', callback)
});
