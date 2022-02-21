export class StringHelper {
    static FirstUpper(v?: string | null) {
        if (!v || v.length < 1)
            return v;

        return v.charAt(0).toUpperCase() + v.slice(1);
    }

    static isNullOrEmpty(val: string | undefined | null) {
        if (val === undefined || val === null || val === '') {
            return true;
        }
        return false;
    }
    static isNullOrWhiteSpace(val: string | undefined | null) {
        if (val === undefined || val === null || val.trim() === '') {
            return true;
        }
        return false;
    }
    static tryTrim(val: string | undefined | null) {
        if (val === undefined || val === null) {
            return val;
        }
        return val.trim();
    }
    static ifNullEmpty(val: string | undefined | null) {
        if (val === undefined || val === null || val === '') {
            return '';
        }
        return val;
    }
    static join(val: string | undefined | null, separator: string, part: string | undefined | null) {
        if (val === undefined || val === null || val === '') {
            return part;
        }

        if (part === undefined || part === null || part === '') {
            return val;
        }

        return val + separator + part;
    }
}