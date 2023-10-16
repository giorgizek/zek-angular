export interface Batch extends Array<BatchItem> {
}
export interface BatchItem {
    method: HttpRequestMethod,
    path?: string | null;
    body: any;
}


export type HttpRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'