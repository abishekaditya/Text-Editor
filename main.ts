import { app, BrowserWindow, Menu, MenuItem } from 'electron';

let win;

let createWindow = () => {
    //
    // Actually open the window
    win = new BrowserWindow({width:800, height: 900});
    win.loadURL(`file://${__dirname}/index.html`);
    createMenu();

    win.on('closed', () => {
        win = null;
    });
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(win === null) createWindow();
});

let createMenu = () => {
    console.log("Create Menu");
    const menu = Menu.getApplicationMenu();
    menu.insert(0,new MenuItem({
        label: 'File',
        submenu: [
            {
                label: 'Save',
                click: () => {
                    win.webContents.send('save');
                     
                }
            }
        ]
        })
    );
    Menu.setApplicationMenu(menu);
}

