import { IFileString } from "../models";

export class Base64Helper {
    static utf8ToBase64String(str: string) {
        return btoa(unescape(encodeURIComponent(str)));
    }

    static base64StringToUtf8(str: string) {
        return decodeURIComponent(escape(atob(str)));
    }

    static base64StringToBlob(str: string, type?: string) {
        const byteString = atob(str);
        const int8Array = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: type });
        return blob;
    }

    static fileToDataUrl(file: File) {
        return new Promise<IFileString>((resolve, reject) => {
            if (!file) {
                reject('file is null');
            }

            const reader = new FileReader();
            reader.onloadend = () => {

                resolve({
                    fileName: file.name,
                    content: reader.result,
                } as IFileString);
            };
            reader.readAsDataURL(file);
        });
    }
    static fileToBase64String(file: File) {
        return new Promise<IFileString>((resolve, reject) => {
            if (!file) {
                reject('file is null');
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                const index = dataUrl.indexOf(',');
                resolve({
                    fileName: file.name,
                    content: dataUrl.substring(index + 1),
                } as IFileString);
            };
            reader.readAsDataURL(file);
        });
    }
}
