"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Helpers
// =======
const template = [];
// Module
// ======
exports.default = (mainWindow) => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (process.platform === 'darwin') {
        // OS X
        const name = 'electron-nuxt3';
        template.unshift({
            label: name,
            submenu: [
                {
                    label: 'About ' + name,
                    role: 'about'
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click() {
                        electron_1.app.quit();
                    }
                },
                {
                    label: 'Reload',
                    accelerator: 'Command+R',
                    click() {
                        // Reload the current window
                        if (mainWindow) {
                            mainWindow.reload();
                        }
                    }
                },
                ...(isDevelopment
                    ? [
                        {
                            label: 'Toggle Developer Tools',
                            accelerator: 'Alt+Command+I',
                            click() {
                                // Open the DevTools.
                                if (mainWindow) {
                                    mainWindow.webContents.toggleDevTools();
                                }
                            }
                        }
                    ]
                    : [])
            ]
        });
        const menu = electron_1.Menu.buildFromTemplate(template);
        electron_1.Menu.setApplicationMenu(menu);
        console.log('[-] MODULE::macMenu Initialized');
    }
};
