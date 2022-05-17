const { BrowserWindow, ipcMain, app } = require("electron");

let splashWin = null;

ipcMain.handle("BETTER_SPLASH_SHOW_SPLASH", () => {
    splashWin?.show?.();
});

ipcMain.handle("BETTER_SPLASH_OPEN_DEVTOOLS", (event) => {
    event?.sender?.toggleDevTools?.();
});

app.on("browser-window-created", (_, win) => {
    if (win.id === 1 || win.title === "Discord Updater") splashWin = win;
});