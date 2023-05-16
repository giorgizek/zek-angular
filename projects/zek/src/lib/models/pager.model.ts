export class PagerBase {
    totalItemCount: number = 0;
}

export class Pager extends PagerBase {
    pageCount: number = 1;
    pageNumber: number = 1;
    pageSize: number = 25;
    hasPreviousPage: boolean = false;
    hasNextPage: boolean = false;
    isFirstPage: boolean = false;
    isLastPage: boolean = false;
    firstItemOnPage: number = 0;
    lastItemOnPage: number = 0;

    pages: number[] = [];
}

export class PagedListBase<T = any> {
    data: T[] = [];

    pager: Pager = new Pager();

    totalItemCount: number = 0;
    pageNumber: number = 1;
    pageSize: number = 25;
    count: number = 0;
}
export class PagedList<T = any> extends PagedListBase<T>
{
    pageCount: number = 1;
    hasPreviousPage: boolean = false;
    hasNextPage: boolean = false;
    isFirstPage: boolean = false;
    isLastPage: boolean = false;
    firstItemOnPage: number = 0;
    lastItemOnPage: number = 0;
}