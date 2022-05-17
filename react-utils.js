let elementSymbol = null;

export const setElementSymbol = function (symbol) {
    elementSymbol = symbol;
};

export const createElement = function (type, props = {}, ...children) {
    const element = {
        $$typeof: elementSymbol,
        type: type,
        ref: null,
        props: {
            children: children
        }
    };

    for (const prop in props) {
        switch (prop) {
            case "key":
            case "ref":
                element[prop] ??= props[prop];
                break;
            case "children":
                element.props.children.push(...(Array.isArray(props[prop]) ? props[prop] : [props[prop]]));
                break;
            default:
                element.props[prop] = props[prop];
        }
    }

    if (type?.defaultProps) {
        for (const prop in type.defaultProps) {
            element.props[prop] ??= type.defaultProps[prop];
        }
    }

    return element;
};

export class ReactComponent {
    constructor(props) {
        this.props = props;
    }

    isMounted() { return !!this._isMounted; }

    forceUpdate(callback) { this.updater.enqueueForceUpdate(this, callback, "forceUpdate"); }

    isReactComponent() { return true; }

    replaceState(state, callback) { this.updater.enqueueReplaceState(this, callback, state); }

    setState(state, callback) {
        if (typeof state !== "object" && typeof state !== "function" && state != null) throw "Silly.";

        this.updater.enqueueSetState(this, state, callback, "setState");
    }
}