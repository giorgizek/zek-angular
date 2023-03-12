export class FilterBase {
    id?: number | null = null;
    isDeleted: boolean | null = null;
    quickSearch: string | null = null;

    page: number = 1;
    pageSize: number = 10;

    sort: string | null = null;
    asc: boolean = false;
}