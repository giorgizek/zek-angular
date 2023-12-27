export class KeyPair<TKey = any, TValue = any> {
    key?: TKey | null;
    value?: TValue | null;

    constructor(init?: Partial<KeyPair>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}

export class KeyPairEx<TKey = any, TValue = any> extends KeyPair<TKey, TValue> {
    [key: string]: any
}

export class KeyPairChecked<TKey = any, TValue = any> extends KeyPair<TKey, TValue> {
    checked?: boolean | null;

}

export class KeyPairRequired<TKey = any, TValue = any> extends KeyPair<TKey, TValue> {
    required?: boolean | null;
}