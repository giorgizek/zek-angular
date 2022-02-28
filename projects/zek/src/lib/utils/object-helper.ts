export class ObjectHelper {

    static isObject(item: any): boolean {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }


    static isDefined(value: any) {
        return typeof value !== 'undefined' && value !== null;
    }

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


    static mergeDeep(target: any, source: any): any {
        let output = Object.assign({}, target);
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach((key: any) => {
                if (this.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    } else {
                        output[key] = this.mergeDeep(target[key], source[key]);
                    }
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    }
}