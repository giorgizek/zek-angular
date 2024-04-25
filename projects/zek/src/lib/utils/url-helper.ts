import { StringHelper } from "./string-helper";

export class UrlHelper {
    static getController(url: string) {
        return url.substring(0, url.lastIndexOf('/') + 1);
    }

    static getAction(url: string) {
        let action = url.substring(url.lastIndexOf('/') + 1);
        let i = action.indexOf(';');
        return i === -1 ? action : action.substring(0, i);
    }

    static getNoParam(url: string) {
        let i1 = url.indexOf('?');
        let i2 = url.indexOf(';');
        if (i1 !== -1) {
            if (i2 !== -1) {
                let min = i1 < i2 ? i1 : i2;
                return url.substring(0, min)
            }
            return url.substring(0, i1)
        }
        if (i2 !== -1) {
            return url.substring(0, i2)
        }
        return url;
    }

    static combine(...parts: string[]) {
        let result = '';
        for (const part of parts) {
            if (!part) continue;

            result = this.combineEnsureSingleSeparator(result, part, '/');
        }
        return result;
    }

    private static combineEnsureSingleSeparator(a: string, b: string, separator: string = '') {
        if (!a) return b;
        if (!b) return a;
        return StringHelper.trimEnd(a, separator) + separator + StringHelper.trimStart(b, separator);
    }
}