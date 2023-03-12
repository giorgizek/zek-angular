export class Base64Helper {
    public static Utf8ToBase64String(str: string) {
        return btoa(unescape(encodeURIComponent(str)));
    }

    public static Base64StringToUtf8(str: string) {
        return decodeURIComponent(escape(atob(str)));
    }
}
