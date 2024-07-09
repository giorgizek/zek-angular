export class StorageHelper {
    static set(key: string, value: any) {
        if (!key) { return; }

        if (!value) {
            localStorage.removeItem(key);
            return;
        }

        if (typeof value === "object") {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }


    static get(key: string) {
        const str = localStorage.getItem(key);
        if (!str) { return null; }
    
        // assume it is an object that has been stringified
        if (str[0] === '{') {
            const v = JSON.parse(str);
            return v;
        }
    
        return str;
    }
}