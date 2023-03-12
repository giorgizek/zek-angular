export class MathHelper {
    static round(value: number, decimals: number = 0): number {
        return Math.round(Number(value) * Math.pow(10, decimals)) / (Math.pow(10, decimals));
    };
}