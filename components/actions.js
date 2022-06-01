import {createElement, ReactComponent} from "../react-utils.js";
import {CloseIcon, PlayIcon, SkipIcon, TerminalIcon} from "./icons.js";


export default class Actions extends ReactComponent {
    state = {
        continued: false
    };

    get config() {return BetterSplash.getConfig();}

    get canSkip() {
        const {appState} = this.props;

        return appState === "downloading-updates" || appState === "installing-updates" || appState === "checking-for-updates";
    }

    render() {
        const {DEVTOOLS_BUTTON, SKIP_BUTTON, PAUSE_ON_START, CLOSE_BUTTON} = this.config;
        
        return createElement("div", {
            className: "splash-controls",
            children: [
                CLOSE_BUTTON && createElement("button", {
                    className: "splash-close-button tooltip tooltipBottom pointerRight",
                    "data-tip": "Close",
                    key: "close-button",
                    onClick: () => DiscordSplash.quitDiscord()
                }, createElement(CloseIcon, {})),
                this.canSkip && SKIP_BUTTON && createElement("button", {
                    className: "splash-control-button tooltip tooltipTop pointerLeft",
                    "data-tip": "Skip Update",
                    key: "skip-button",
                    onClick: () => {
                        DiscordSplash.signalReady();
                    }
                }, createElement(SkipIcon, {})),
                PAUSE_ON_START && !this.state.continued && createElement("button", {
                    className: "splash-control-button tooltip tooltipTop pointerLeft",
                    "data-tip": "Continue",
                    key: "continue-button",
                    onClick: () => {
                        BetterSplash.continue(true);
                        this.setState({continued: true});
                    }
                }, createElement(PlayIcon, {})),
                DEVTOOLS_BUTTON && createElement("button", {
                    className: "splash-control-button tooltip tooltipTop pointerLeft",
                    "data-tip": "Open DevTools",
                    key: "devtools-button",
                    onClick: () => {
                        BetterSplash.openDevTools();
                    }
                }, createElement(TerminalIcon, {}))
            ]
        });
    }
}