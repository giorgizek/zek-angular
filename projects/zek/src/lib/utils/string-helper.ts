export class StringHelper {
    static firstUpper(v?: string | null) {
        if (!v || v.length < 1)
            return v;

        return v.charAt(0).toUpperCase() + v.slice(1);
    }

    static isNullOrEmpty(value?: string | null) {
        return typeof value === 'undefined' || value == null || ((typeof value === 'string') && value.length === 0);
    }
    static isNullOrWhiteSpace(value?: string | null) {
        return typeof value === 'undefined' || value == null || ((typeof value === 'string') && value.trim().length === 0);
    }
    static tryTrim(val: string | undefined | null) {
        if (val === undefined || val === null) {
            return val;
        }
        return val.trim();
    }
    static ifNullEmpty(value?: string | null) {
        return typeof value === 'undefined' || value == null ? '' : value;
    }
    static join(val: string | undefined | null, separator: string, part: string | undefined | null) {
        if (this.isNullOrEmpty(val)) {
            return part;
        }

        if (this.isNullOrEmpty(part)) {
            return val;
        }

        return val + separator + part;
    }
}