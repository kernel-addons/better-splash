const { contextBridge, ipcRenderer } = require("electron");
const { PAUSE_ON_START } = require("./index.json").config;

let initialize = null;
let shouldPause = PAUSE_ON_START;
contextBridge.exposeInMainWorld("BetterSplash", {
    getConfig: () => require("./index.json").config,
    show: () => {
        ipcRenderer.invoke("BETTER_SPLASH_SHOW_SPLASH");
    },
    openDevTools: () => {
        ipcRenderer.invoke("BETTER_SPLASH_OPEN_DEVTOOLS");
    },
    continue: (immediately) => {
        shouldPause = false;
        if (immediately) initialize?.();
    }
});

contextBridge.exposeInMainWorld = new Proxy(contextBridge.exposeInMainWorld, {
    apply(original, _this, args) {
        const [name, api] = args;
        if (name === "DiscordSplash" && !initialize) {
            const original = initialize = api.signalReady;

            api.signalReady = () => {
                if (shouldPause) return;

                original();
            }
        }

        return original.apply(_this, args);
    }
});