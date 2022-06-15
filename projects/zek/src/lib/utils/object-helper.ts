export class ObjectHelper {

    static isDefined(value: any) {
        return typeof value !== 'undefined' && value !== null;
    }
    
    static isObject(value: any){
        return this.isDefined(value) && typeof value === 'object';
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





    static deepCopy<T = any>(value: any): T {
        if (!this.isObject(value))
            return value;

        let output: any = {};
        Object.keys(value).forEach((key: any) => {
            const v = value[key];
            
            if (this.isObject(v))
            {
                output[key] = this.deepCopy(v);
                
            } else{
                Object.assign(output, { [key]: v });
            }
        });
        
        return output as T;
    }

}