import {createElement} from "../react-utils";

export function CloseIcon(props) {
    return createElement("svg", {
        width: 12,
        height: 12,
        ...props,
        viewBox: "40 40 20 20",
        children: createElement("path", {
            d: "m40.445 42.853 2.408-2.408c.593-.593 1.555-.593 2.147 0l5 5 5-5c.593-.593 1.554-.593 2.147 0l2.408 2.408c.593.593.593 1.554 0 2.147l-5 5 5 5c.593.593.592 1.554 0 2.147l-2.408 2.408c-.593.593-1.555.593-2.147 0l-5-5-5 5c-.593.593-1.554.593-2.147 0l-2.408-2.408c-.593-.593-.593-1.554 0-2.147l5-5-5-5c-.593-.593-.593-1.555 0-2.147z",
            fill: "#fff"
        })
    });
}

export function TerminalIcon(props) {
    return createElement("svg", {
        width: 16,
        height: 16,
        ...props,
        viewBox: "0 0 24 24",
        children: [
            createElement("rect", {
                fill: "none",
                height: 24,
                width: 24
            }),
            createElement("path", {
                d: "M20,4H4C2.89,4,2,4.9,2,6v12c0,1.1,0.89,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.11,4,20,4z M20,18H4V8h16V18z M18,17h-6v-2 h6V17z M7.5,17l-1.41-1.41L8.67,13l-2.59-2.59L7.5,9l4,4L7.5,17z",
                fill: "currentColor"
            })
        ]
    });
}

export function PlayIcon(props) {
    return createElement("svg", {
        width: 16,
        height: 16,
        ...props,
        viewBox: "0 0 24 24",
        children: [
            createElement("path", {
                d: "M0 0h24v24H0z",
                fill: "none"
            }),
            createElement("path", {
                d: "M8 5v14l11-7z",
                fill: "currentColor"
            })
        ]
    });
}

export function SkipIcon(props) {
    return createElement("svg", {
        width: 16,
        height: 16,
        viewBox: "0 0 24 24",
        ...props,
        children: [
            createElement("path", {
                d: "M0 0h24v24H0z",
                fill: "none"
            }),
            createElement("path", {
                d: "M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z",
                fill: "currentColor"
            })
        ]
    });
}