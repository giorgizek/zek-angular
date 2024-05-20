export class Pager {
    totalItemCount = 0;
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


export class PagedList<T = any> {
    data: T[] = [];

    pager: Pager = new Pager();

    totalItemCount = 0;
    count = 0;
    pageNumber = 1;
    pageSize = 25;

    pageCount = 1;
    hasPreviousPage = false;
    hasNextPage = false;
    isFirstPage = false;
    isLastPage = false;
    firstItemOnPage = 0;
    lastItemOnPage = 0;
}