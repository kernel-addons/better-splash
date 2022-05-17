export default class TreeSearcher {
    constructor(target, type) {
        this._current = target;
        this._break = false;

        switch (type) {
            case "react": {
                this.defaultWalkable = ["props", "children"];
            } break;

            case "react-vdom": {
                this.defaultWalkable = ["child", "return", "alternate"];
            } break;

            default: {
                this.defaultWalkable = [];
            };
        }
    }

    type() { return typeof this._current; }

    isNull() { return this._current == null; }

    isArray() { return this._break = !Array.isArray(this._current), this; }

    isNumber() { return this._break = this.type() !== "number", this; }

    isFunction() { return this._break = this.type() !== "function", this; }

    isObject() { return this._break = !(this.type() === "object" && this._current !== null), this; }

    where(condition) { return this._break = !condition.call(this, this.value(), this), this; }

    walk(...path) {
        if (this._break) return this;

        for (let i = 0; i < path.length; i++) {
            if (!this._current) break;

            this._current = this._current?.[path[i]];
        }

        if (!this._current) this._break = true;

        return this;
    }

    find(filter, { ignore = [], walkable = this.defaultWalkable, maxProperties = 100 } = {}) {
        if (this._break) return this;
        const stack = [this._current];

        while (stack.length && maxProperties) {
            const node = stack.shift();
            if (filter(node)) {
                this._current = node;
                return this;
            }

            if (Array.isArray(node)) stack.push(...node);
            else if (typeof node === "object" && node !== null) {
                for (const key in node) {
                    const value = node[key];

                    if (
                        (walkable.length && (~walkable.indexOf(key) && !~ignore.indexOf(key))) ||
                        node && ~ignore.indexOf(key)
                    ) {
                        stack.push(value);
                    }
                }
            }
            maxProperties--;
        }

        this._break = true;
        this._current = null;

        return this;
    }

    put(factory) {
        if (this._break) return this;

        const value = this._current = factory.call(this, this.value(), this);
        if (value == null) this._break = true;

        return this;
    }

    call(_this, ...args) {
        if (this._break) return this;

        const value = this._current = this._current.call(_this, ...args);
        if (value == null) this._break = true;

        return this;
    }

    break() { return this._break = true, this; }

    value() { return this._current; }

    toString() { return String(this._current); }

    then(onSuccess, onError) {
        return Promise.resolve(this._current)
            .then(
                value => (onSuccess.call(this, value), this),
                onError
                    ? (error) => (onError(error), this)
                    : void 0
            );
    }
}