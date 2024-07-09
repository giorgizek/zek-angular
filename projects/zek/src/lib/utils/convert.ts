export class Convert {
    static toBoolean(value: any) {
        if (typeof value !== 'undefined' && value !== null && value !== '') {
            switch (`${value}`.toUpperCase()) {
                case "TRUE":
                case "YES":
                case "1":
                case "ON":
                    return true;

                default:
                    return false;
            }
        }

        return false;
    }

    static toBooleanProperty(value: any): boolean {
        return value != null && `${value}` !== 'false';
    }

    static parseNumber(value: any) {
        if (typeof value === 'undefined' || value == null || (typeof value === 'string' && value.length === 0)) return null;
        const n = Number(value);
        return !isNaN(n) ? n : null;
    }
    static toNumber(value: any, defaultValue = 0) {
        return this.isNumber(value) ? Number(value) : defaultValue;
    }

    static isNumber(value: any): boolean {
        // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
        // and other non-number values as NaN, where Number just uses 0) but it considers the string
        // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
        return !isNaN(parseFloat(value as any)) && !isNaN(Number(value));
    }

    // static toNumber(value: any){
    //     if (typeof value !== 'undefined' && value !== null && value !== '') {
    //         return +value;
    //     }

    //     return 0;
    // }
}