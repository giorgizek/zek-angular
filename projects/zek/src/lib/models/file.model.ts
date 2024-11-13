export interface IFileBase<TId = number, TContent = string> {
    id?: TId | null;
    key?: string | null;
    fileName?: string | null;
    extension?: string | null;
    mediaType?: string | null;
    fileSize?: number | null;
    hash?: string | null;
    createDate?: Date | null;
    isDeleted?: boolean | null;
    content?: TContent | null;
}
export interface IFileString extends IFileBase<number, string> {
    // constructor(init?: Partial<FileString>);
}