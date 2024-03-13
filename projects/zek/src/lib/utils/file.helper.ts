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

        let length = path.length;
        for (let i = length; --i >= 0;) {
            let ch = path[i];
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
            let a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
}