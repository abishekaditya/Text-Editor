import { app, BrowserWindow } from 'electron';
import { SpellCorrector } from './lib/spelling';

let win;

let createWindow = () => {

    //
    // Spelling Corrector Usage
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let corrector = new SpellCorrector(letters);
    corrector.loadCounts('./word_counts.json', () => {
        console.log(corrector.correct('korrect'));
    });

    //
    // Actually open the window
    win = new BrowserWindow({width:800, height: 900});
    win.loadURL(`file://${__dirname}/index.html`);


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

