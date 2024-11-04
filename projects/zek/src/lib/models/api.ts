export interface IApiResponse<TValue extends any = any> {
    success?: boolean | null;
    errors: { [key: string]: string[] };

    value?: TValue | null;
}