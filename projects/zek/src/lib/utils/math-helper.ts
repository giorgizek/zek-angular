export class MathHelper {
    // static round(value: number, decimals: number = 0): number {
    //     return Math.round(Number(value) * Math.pow(10, decimals)) / (Math.pow(10, decimals));
    // }
    static round(value: number, decimals = 0): number {
        if (!Number.isFinite(value)) return NaN;

        const factor = 10 ** decimals;
        return Math.round((value + Number.EPSILON) * factor) / factor;
    }

    static clamp(v: number, min: number, max: number) {
        return Math.max(min, Math.min(max, v));
    }

    // static sum(...values: number[]) {
    //     return values.reduce((acc, cur) => acc + cur, 0);
    // }
    static sum(...values: number[]) {
        let sum = 0;
        for (let i = 0; i < values.length; i++) {
            sum += values[i];
        }
        return sum;
    }


    static format(num: number, digits: number = 2): string {
        if (num === null || num === undefined || isNaN(num)) return '0';

        // If less than 1000, display normally
        if (Math.abs(num) < 1000) {
            return num.toString();
        }

        const suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

        // Calculate the index of the suffix
        // e.g. 1,000 -> index 0 ('k'), 1,000,000 -> index 1 ('M')
        const exp = Math.floor(Math.log(Math.abs(num)) / Math.log(1000));

        const value = num / Math.pow(1000, exp);
        const rounded = this.round(value, digits);

        // Return with suffix (subtract 1 because index 0 is 'k', not '1')
        return rounded + suffixes[exp - 1];
    }
}