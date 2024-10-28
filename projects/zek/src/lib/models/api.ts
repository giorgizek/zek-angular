export interface IApiResponse<TResponse extends any = any> {
    success?: boolean | null;
    errors: { [key: string]: string[] };

    result?: TResponse | null;
}