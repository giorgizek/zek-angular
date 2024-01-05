export class RandomHelper {
    static randomHex(count: number = 2) {
        let out: string = '';
        for (let i: number = 0; i < count; i++) {
            // tslint:disable-next-line:no-bitwise
            out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return out;
    }

    static randomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return  Math.floor(Math.random() * (max - min + 1)) + min;
    }
}