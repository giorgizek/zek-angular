export class FileBase {
    id?: number | null;
    //mimeType: string;
    fileName?: string | null;
    fileType?: string | null;
    fileSize?: number | null;
    isDeleted?: boolean | null;
}
export class FileString extends FileBase {
    data?: string | null;

    constructor(init?: Partial<FileString>) {
        super();
        if (init) {
            Object.assign(this, init);
        }
    }
}
export class FileBytes extends FileBase {
    //data: byte[];

    constructor(init?: Partial<FileString>) {
        super();
        if (init) {
            Object.assign(this, init);
        }
    }
}