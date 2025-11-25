
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
        for (const prop in obj) {
            const v = obj[prop];
            if (!this.isEmptyValue(v))
                return false;
            // if (typeof (obj[prop]) !== undefined && obj[prop] !== null && obj[prop] !== '') {
            //     return false;
            // }
        }

        return true;
    }


    /**
     * @deprecated The method should not be used. please use deleteNullFields
     */
    static deleteNullKeys(val: any) {
        this.deleteNullFields(val);
    }

    static deleteNullFields<T extends {}>(val: T) {
        if (!val) return;
        for (let key in val) {
            let tmp = val[key];
            if (tmp === undefined || tmp === null) {
                delete val[key];
            }
        }
        return val
    }

    static assignFields<T extends {}, U extends {}>(target: T, source: U): T {
        let t: any = target;
        let s: any = source;
        for (const key of Object.keys(target)) {
            let v = s[key];
            if (typeof v !== 'undefined') {
                t[key] = v;
            }
        }
        return target;
    }



    static deepCopy<T = any>(value: any): T {
        // 1. Guard clause: if value is null or not an object, return it.
        // (This handles primitives and breaks recursion)
        if (!this.isObject(value))
            return value;

        // 2. Handle Arrays
        if (Array.isArray(value)) {
            return value.map(x => this.deepCopy(x)) as any;
        }

        // 3. Handle Objects
        const output: any = {};
        for (const key of Object.keys(value)) {
            const v = value[key];
            if (this.isObject(v)) {
                output[key] = this.deepCopy(v);
            } else {
                Object.assign(output, { [key]: v });
            }
        }

        return output as T;
    }

}