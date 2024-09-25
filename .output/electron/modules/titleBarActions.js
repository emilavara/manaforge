"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Helpers
// =======
const getWindowFromEvent = (event) => {
    const webContents = event.sender;
    const win = electron_1.BrowserWindow.fromWebContents(webContents);
    return win;
};
// Module
// ======
exports.default = (mainWindow) => {
    electron_1.ipcMain.handle('isMaximized:app', (event) => {
        const win = getWindowFromEvent(event);
        return win?.isMaximized();
    });
    electron_1.ipcMain.handle('titlebar:action', (event, action) => {
        const win = getWindowFromEvent(event);
        if (!win)
            return;
        switch (action) {
            case 'toggleMaximize':
                win.isMaximized() ? win.unmaximize() : win.maximize();
                break;
            case 'minimize':
                win.minimize();
                break;
        }
    });
    electron_1.ipcMain.handle('close:app', (event) => {
        const win = getWindowFromEvent(event);
        if (!win)
            return;
        win.close();
    });
    electron_1.ipcMain.handle('get:windowVisible', (_event) => {
        return mainWindow.isVisible();
    });
    mainWindow.on('maximize', () => mainWindow.webContents.send('window:maximizeChanged', true));
    mainWindow.on('unmaximize', () => mainWindow.webContents.send('window:maximizeChanged', false));
    mainWindow.on('enter-full-screen', () => mainWindow.webContents.send('window:fullscreenChanged', true));
    mainWindow.on('leave-full-screen', () => mainWindow.webContents.send('window:fullscreenChanged', false));
    console.log('[-] MODULE::titleBarActions Initialized');
};
// https://www.electronjs.org/docs/latest/tutorial/ipc
