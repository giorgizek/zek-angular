export class MathHelper {
    static round(value: number, decimals: number = 0): number {
        return Math.round(Number(value) * Math.pow(10, decimals)) / (Math.pow(10, decimals));
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
}