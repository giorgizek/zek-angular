export class TmpHelper {
    private static _obj: any = {};

    static get(key: string): any {
        if (!key) return;
        return this._obj[key];
    }

    static set(key: string, value: any) {
        if (!key) return;
        this._obj[key] = value;
    }

    static clear() {
        this._obj = {};
    }
    static remove(key: string) {
        if (!key) return;
        delete this._obj[key]
    }
}