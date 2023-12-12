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
        if (!val)
            return val;
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
    static trim(val: string | null, ch: string) {
        if (!val || !ch)
            return val;

        var start = 0,
            end = val.length;

        while (start < end && val[start] === ch)
            ++start;

        while (end > start && val[end - 1] === ch)
            --end;

        return (start > 0 || end < val.length) ? val.substring(start, end) : val;
    }
    static trimAny(val: string | null, chars: string) {
        if (!val || !chars)
            return val;

        var start = 0,
            end = val.length;

        while (start < end && chars.indexOf(val[start]) >= 0)
            ++start;

        while (end > start && chars.indexOf(val[end - 1]) >= 0)
            --end;

        return (start > 0 || end < val.length) ? val.substring(start, end) : val;
    }

}