
export class ObjectHelper {
    static isDefined(value: any) {
        return typeof value !== 'undefined' && value !== null;
    }

    static isObject(value: any) {
        return this.isDefined(value) && typeof value === 'object';
    }


    /**
     * Check if the object is a string or array before evaluating the length attribute.
     * This avoids falsely rejecting objects that contain a custom length attribute.
     * For example, the object {id: 1, length: 0, width: 0} should not be returned as empty.
     */
    static isEmptyValue(value: any): boolean {
        return !this.isDefined(value) || ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
    }


    static isEmpty(obj: any) {
        if (!this.isDefined(obj))
            return true;
        // if (typeof obj === 'undefined' || obj === null)
        //     return true;
        for (let prop in obj) {
            let v = obj[prop];
            if (!this.isEmptyValue(v))
                return false;
            // if (typeof (obj[prop]) !== undefined && obj[prop] !== null && obj[prop] !== '') {
            //     return false;
            // }
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



    static deepCopy<T = any>(value: any): T {
        if (!this.isObject(value))
            return value;

        let output: any = {};
        if (Array.isArray(value)) {
            output = value.map(x => this.deepCopy(x));
        }
        else {
            Object.keys(value).forEach((key: any) => {
                const v = value[key];

                if (this.isObject(v)) {
                    output[key] = this.deepCopy(v);

                } else {
                    Object.assign(output, { [key]: v });
                }
            });
        }

        return output as T;
    }

}