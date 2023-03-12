import { ObjectHelper } from "./object-helper";

export class FilterHelper {
    static isEmpty(obj: any) {
        if (typeof obj === 'undefined' || obj === null)
            return true;

        let tmp = Object.assign({}, obj);
        delete tmp.page;
        delete tmp.pageSize;
        delete tmp.sort;

        return ObjectHelper.isEmpty(tmp);
    }
}