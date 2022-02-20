export class StringHelper {
    static FirstUpper(v?: string | null) {
        if (!v || v.length < 1)
            return v;

        return v.charAt(0).toUpperCase() + v.slice(1);
    }
}