export class TmpHelper {
    private static _obj: any = {};

    static get(key: string, remove = true): any {
        if (!key) return;
        let v = this._obj[key];
        if (remove)
            this.remove(key);
        return v;
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