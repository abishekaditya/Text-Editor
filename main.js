"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
let win;
let createWindow = () => {
    //
    // Actually open the window
    win = new electron_1.BrowserWindow({ width: 800, height: 900 });
    win.loadURL(`file://${__dirname}/index.html`);
    createMenu();
    win.on('closed', () => {
        win = null;
    });
};
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (win === null)
        createWindow();
});
let createMenu = () => {
    console.log("Create Menu");
    const menu = electron_1.Menu.getApplicationMenu();
    if (menu == null)
        return;
    menu.insert(0, new electron_1.MenuItem({
        label: 'File',
        submenu: [
            {
                label: 'Save',
                click: () => {
                    win.webContents.send('save');
                }
            }
        ]
    }));
    electron_1.Menu.setApplicationMenu(menu);
};
