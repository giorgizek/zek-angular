import { IFileString } from "../models";

export class FileHelper {
    static getExtension(path?: string | null) {
        if (path === undefined || path == null)
            return path;

        if (typeof path !== 'string') {
            throw new Error("path parameter is not string");
        }

        const directorySeparatorChar = '\\';
        const altDirectorySeparatorChar = '/';
        const volumeSeparatorChar = ':';

        const length = path.length;
        for (let i = length; --i >= 0;) {
            const ch = path[i];
            if (ch === '.') {
                if (i !== length - 1)
                    return path.substring(i, length);
                else
                    return '';
            }
            if (ch == directorySeparatorChar || ch == altDirectorySeparatorChar || ch == volumeSeparatorChar)
                break;
        }

        return '';
    }


    static download(blob: Blob | null, fileName: string) {
        if (!blob) return;

        const nav = (window.navigator as any);
        if (nav && nav.msSaveOrOpenBlob) {
            nav.msSaveOrOpenBlob(blob, fileName);
        } else {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
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