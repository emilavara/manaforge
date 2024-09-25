"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const electron_1 = require("electron");
const singleInstance_1 = __importDefault(require("./singleInstance"));
const dynamicRenderer_1 = __importDefault(require("./dynamicRenderer"));
const titleBarActions_1 = __importDefault(require("./modules/titleBarActions"));
const updater_1 = __importDefault(require("./modules/updater"));
const macMenu_1 = __importDefault(require("./modules/macMenu"));
// Initilize
// =========
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
const isProduction = process.env.NODE_ENV !== 'development';
const platform = process.platform;
const architucture = os.arch() === 'x64' ? '64' : '32';
const headerSize = 32;
const modules = [titleBarActions_1.default, macMenu_1.default, updater_1.default];
// Initialize app window
// =====================
function createWindow() {
    console.log('System info', { isProduction, platform, architucture });
    // Create the browser window.
    const mainWindow = new electron_1.BrowserWindow({
        width: 1366,
        height: 768,
        minWidth: 800,
        minHeight: 599,
        backgroundColor: '#000',
        webPreferences: {
            devTools: !isProduction,
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        },
        titleBarStyle: 'hiddenInset',
        // frame: platform === 'darwin',
        frame: false,
        titleBarOverlay: platform === 'darwin' && { height: headerSize },
        title: 'Manaforge dev build 0.0.1'
    });
    // Lock app to single instance
    if ((0, singleInstance_1.default)(electron_1.app, mainWindow))
        return;
    // Open the DevTools.
    !isProduction &&
        mainWindow.webContents.openDevTools({
            mode: 'bottom'
        });
    return mainWindow;
}
// App events
// ==========
electron_1.app.whenReady().then(async () => {
    if (!isProduction) {
        try {
            await electron_1.session.defaultSession.loadExtension(path.join(__dirname, '../..', '__extensions', 'vue-devtools'));
        }
        catch (err) {
            console.log('[Electron::loadExtensions] An error occurred: ', err);
        }
    }
    const mainWindow = createWindow();
    if (!mainWindow)
        return;
    // Load renderer process
    (0, dynamicRenderer_1.default)(mainWindow);
    // Initialize modules
    console.log('-'.repeat(30) + '\n[+] Loading modules...');
    modules.forEach((module) => {
        try {
            module(mainWindow);
        }
        catch (err) {
            console.log('[!] Module error: ', err.message || err);
        }
    });
    console.log('[!] Loading modules: Done.' + '\r\n' + '-'.repeat(30));
    electron_1.app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        // if (BrowserWindow.getAllWindows().length === 0) createWindow()
        mainWindow.show();
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
