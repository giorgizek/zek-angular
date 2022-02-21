export class ObjectHelper {
    static isEmpty(obj: any) {
        if (obj === undefined || obj === null)
            return true;
        for (let prop in obj) {
            if (obj[prop] !== undefined && obj[prop] !== null && obj[prop] != '') {
                return false;
            }
        }

        return true;
    }

    static deleteNullKeys(val: any) {
        if (!val) return;
        for (let key in val) {
            let tmp = val[key];
            if (tmp === undefined || tmp === null) {
                delete val[key];
                Object.keys
            }
        }
    };


    static isBoolean(val: any) {
        return val === false || val === true;
    }
}