import { Pager } from "../models";

export class PagerHelper {
    static get(totalItemCount: number | null | undefined, pageNumber: number | null | undefined = 1, pageSize: number | null | undefined = 10) {
        if (!totalItemCount) totalItemCount = 0;
        if (!pageNumber) pageNumber = 1;
        if (!pageSize) pageSize = 10;

        // calculate total pages
        const pageCount = Math.ceil(totalItemCount / pageSize);
        let startPage: number, endPage: number;
        if (pageCount <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = pageCount;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (pageNumber <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (pageNumber + 4 >= pageCount) {
                startPage = pageCount - 9;
                endPage = pageCount;
            } else {
                startPage = pageNumber - 5;
                endPage = pageNumber + 4;
            }
        }

        // calculate start and end item indexes
        const firstItemOnPage = (pageNumber - 1) * pageSize + 1;
        const lastItemOnPage = Math.min(firstItemOnPage + pageSize - 1, totalItemCount);

        const hasPreviousPage = pageNumber > 1;
        const hasNextPage = pageNumber < pageCount;
        const isFirstPage = pageNumber <= 1;
        const isLastPage = pageNumber >= pageCount;

        // create an array of pages to ng-repeat in the pager control
        //let pages = _.range(startPage, endPage + 1);
        const pages: number[] = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // return object with all pager properties required by the view
        return {
            pageCount,
            totalItemCount,
            pageNumber,
            pageSize,
            hasPreviousPage,
            hasNextPage,
            isFirstPage,
            isLastPage,
            firstItemOnPage,
            lastItemOnPage,
            startPage: startPage,
            endPage: endPage,
            pages
        } as Pager;
    }
}