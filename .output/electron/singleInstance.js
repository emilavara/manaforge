"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app, win) => {
    const gotTheLock = app.requestSingleInstanceLock();
    if (!gotTheLock) {
        app.quit();
        return true;
    }
    app.on('second-instance', (_, _argv) => {
        if (win) {
            win.show();
            if (win.isMinimized())
                win.restore();
            win.focus();
        }
    });
    app.on('open-url', function (event, url) {
        event.preventDefault();
        win.webContents.send('deeplink', url);
    });
};
