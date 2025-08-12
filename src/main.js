// Imports =====================================================================
/* 
import Electron modules with CommonJS module syntax
app - control app's event lifecycle
BrowserWindow - creates and manages app windows
Menu / MenuItem - handling local keyboard shortcuts
*/
const { app, BrowserWindow, Menu, MenuItem, screen, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('fs');

// path to progress data file
const progressFilePath = path.join(app.getPath('userData'), 'progress.json');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  
  // Maximize window
  mainWindow.maximize();

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// Handler to read (progress) data from file ===================================
ipcMain.handle('get-progress', async () => {
  try {
    // Check if progress file exists, if not, make a copy of progress data.
    if (!fs.existsSync(progressFilePath)) {

      const sourceProgressPath = path.join(__dirname, '..', '..', 'src', 'data', 'progress.json');
      
      try {
        const templateData = fs.readFileSync(sourceProgressPath, 'utf8');
        fs.writeFileSync(progressFilePath, templateData);
        return JSON.parse(templateData);
      } catch (copyError) {
        console.error('Failed to copy progress file from source:', copyError);
        // Fallback to an empty array if the source file can't be found
        fs.writeFileSync(progressFilePath, JSON.stringify([], null, 2));
        return [];
      }
    }
    const data = fs.readFileSync(progressFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read progress file:', error);
    return [];
  }
});

// Handler to save progress data to the file ===================================
ipcMain.handle('save-progress', async (event, data) => {
  try {
    fs.writeFileSync(progressFilePath, JSON.stringify(data, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Failed to save progress file:', error);
    return { success: false, error: error.message };
  }
});

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