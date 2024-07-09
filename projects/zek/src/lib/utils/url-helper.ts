import { StringHelper } from "./string-helper";

export class UrlHelper {
    static getController(url: string) {
        return url.substring(0, url.lastIndexOf('/') + 1);
    }

    static getAction(url: string) {
        const action = url.substring(url.lastIndexOf('/') + 1);
        const i = action.indexOf(';');
        return i === -1 ? action : action.substring(0, i);
    }

    static getNoParam(url: string) {
        const i1 = url.indexOf('?');
        const i2 = url.indexOf(';');
        if (i1 !== -1) {
            if (i2 !== -1) {
                const min = i1 < i2 ? i1 : i2;
                return url.substring(0, min)
            }
            return url.substring(0, i1)
        }
        if (i2 !== -1) {
            return url.substring(0, i2)
        }
        return url;
    }

    static combine(...parts: any[]) {
        let result = '';
        for (const part of parts) {
            if (typeof part === 'undefined' && part === null)
                continue;
            const str = `${part}`;
            result = this.combineEnsureSingleSeparator(result, str, '/');
        }
        return result;
    }

    private static combineEnsureSingleSeparator(a: string, b: string, separator: string = '') {
        if (!a) return b;
        if (!b) return a;
        return StringHelper.trimEnd(a, separator) + separator + StringHelper.trimStart(b, separator);
    }
}