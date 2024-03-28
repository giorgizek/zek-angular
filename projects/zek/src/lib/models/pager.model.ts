export class PagerBase {
    totalItemCount: number = 0;
}

export class Pager extends PagerBase {
    pageCount = 1;
    pageNumber = 1;
    pageSize = 25;
    hasPreviousPage = false;
    hasNextPage = false;
    isFirstPage = false;
    isLastPage = false;
    firstItemOnPage = 0;
    lastItemOnPage = 0;

    pages: number[] = [];
}

export class PagedListBase<T = any> {
    data: T[] = [];

    pager: Pager = new Pager();

    totalItemCount = 0;
    pageNumber = 1;
    pageSize = 25;
    count = 0;
}
export class PagedList<T = any> extends PagedListBase<T>
{
    pageCount = 1;
    hasPreviousPage = false;
    hasNextPage = false;
    isFirstPage = false;
    isLastPage = false;
    firstItemOnPage = 0;
    lastItemOnPage = 0;
}