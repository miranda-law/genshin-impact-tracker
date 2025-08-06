// Imports =====================================================================
/* 
import Electron modules with CommonJS module syntax
app - control app's event lifecycle
BrowserWindow - creates and manages app windows
Menu / MenuItem - handling local keyboard shortcuts
*/
const { app, BrowserWindow, Menu, MenuItem, screen, ipcMain } = require('electron');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  
  // Maximize window
  mainWindow.maximize();

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// App Lifecycle ===============================================================

// will be called when Electron has finished initialization and is ready to create browser windows
app.whenReady().then(() => {
  createWindow();

  // open a window if none are open -- macOS
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// quit the app when all windows are closed -- Windows/Linux
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});