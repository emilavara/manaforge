"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_updater_1 = require("electron-updater");
const electron_log_1 = __importDefault(require("electron-log"));
// Logger
// ======
electron_updater_1.autoUpdater.logger = electron_log_1.default;
electron_updater_1.autoUpdater.logger.transports.file.level = 'info';
// Config
// ======
electron_updater_1.autoUpdater.autoDownload = true;
electron_updater_1.autoUpdater.autoInstallOnAppQuit = true;
// Module
// ======
exports.default = (mainWindow) => {
    const isMac = process.platform === 'darwin';
    if (isMac) {
        electron_updater_1.autoUpdater.autoDownload = false;
        electron_updater_1.autoUpdater.autoInstallOnAppQuit = false;
    }
    // Helpers
    // =======
    let readyToInstall = false;
    function sendUpdaterStatus(...args) {
        mainWindow.webContents.send('updater:statusChanged', args);
    }
    electron_updater_1.autoUpdater.on('checking-for-update', () => {
        sendUpdaterStatus('check-for-update');
    });
    electron_updater_1.autoUpdater.on('update-available', (_info) => {
        sendUpdaterStatus('update-available');
    });
    electron_updater_1.autoUpdater.on('update-not-available', (_info) => {
        sendUpdaterStatus('update-not-available');
    });
    electron_updater_1.autoUpdater.on('error', (_err) => {
        sendUpdaterStatus('update-error');
    });
    electron_updater_1.autoUpdater.on('download-progress', (progress) => {
        sendUpdaterStatus('downloading', progress);
    });
    electron_updater_1.autoUpdater.on('update-downloaded', (_info) => {
        sendUpdaterStatus('update-downloaded');
        mainWindow.webContents.send('updater:readyToInstall');
        readyToInstall = true;
    });
    // IPC Listeners
    // =============
    electron_1.ipcMain.handle('updater:check', async (_event) => {
        return await electron_updater_1.autoUpdater.checkForUpdates();
    });
    electron_1.ipcMain.handle('updater:quitAndInstall', (_event) => {
        if (!readyToInstall)
            return;
        electron_updater_1.autoUpdater.quitAndInstall();
    });
    electron_updater_1.autoUpdater.checkForUpdates();
    // Check for updates every 2 hours
    setInterval(() => {
        electron_updater_1.autoUpdater.checkForUpdates();
    }, 1000 * 60 * 60 * 2);
    console.log('[-] MODULE::updater Initialized');
};
