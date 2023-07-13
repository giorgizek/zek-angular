export class Base64Helper {
    public static utf8ToBase64String(str: string) {
        return btoa(unescape(encodeURIComponent(str)));
    }

    public static base64StringToUtf8(str: string) {
        return decodeURIComponent(escape(atob(str)));
    }

    public static base64StringToBlob(str: string, type?: string) {
        const byteString = atob(str);
        const int8Array = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: type });
        return blob;
    }
}
