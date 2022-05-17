import Actions from "./components/actions.js";
import {createElement, setElementSymbol} from "./react-utils.js";
import TreeSearcher from "./treesearcher.js";
import tooltip from "./components/tooltip.js";

const styles = /*inline-css*/`
    .splash-controls {
        position: absolute;
        bottom: 10px;
        left: 5px;
    }

    .splash-controls * {
        -webkit-app-region: no-drag;
        cursor: pointer;
    }

    .splash-close-button {
        position: fixed;
        top: 8px;
        right: 3px;
        cursor: pointer;
    }

    .splash-control-button, .splash-close-button {
        background: transparent;
        border: none;
        color: #ddd;
        font-weight: bolder;
        font-size: 12px;
        cursor: pointer;
    }

` + tooltip;

export default new class BetterSplash {
    get config() {return window.BetterSplash.getConfig();}

    start() {
        if (typeof DiscordSplash === "undefined") return;
        this.injectCSS();

        const root = document.getElementById("splash-mount");
        const Splash = new TreeSearcher(root, "react-vdom")
            .walk("_reactRootContainer", "_internalRoot", "current")
            .find((e) => e?.type?.displayName === "Splash")
            .value();
        
        setElementSymbol(
            new TreeSearcher(Splash, "react")
                .walk("type", "prototype", "render")
                .call({state: {update: {status: ""}}})
                .walk("$$typeof")
                .value()
        );
        if (this.config.PAUSE_ON_START) window.BetterSplash.show();

        this.patchSplash(Splash.type);
        Splash.stateNode.forceUpdate();
    }

    patchSplash(Splash) {
        Splash.prototype.render = new Proxy(Splash.prototype.render, {
            apply(original, _this, args) {
                const ret = original.apply(_this, args);
                const root = ret?.props?.children;
                if (!root) return ret;

                ret.props.children = [root, createElement(Actions, {appState: _this.state.update.status, key: "controls"})];

                return ret;
            }
        });
    }

    injectCSS() {
        document.head.appendChild(Object.assign(document.createElement("style"), {
            id: "better-splash-css",
            textContent: styles
        }));
    }
    
    stop() {
        
    }
}