import { KeyPair } from "../models";

export class ErrorHelper {
    static responseToKeyPairArray(response: any) {
        let error: any;
        if (typeof response.error === 'string' && response.error[0] === '{') {
            error = JSON.parse(response.error);
        } else {
            error = response.error;
        }

        return this.toKeyPairArray(error);
    }

    static toKeyPairArray(error: any) {
        if (typeof error === 'object') {
            const errors = error.traceId || error.success === false
                ? error.errors
                : error;

            const result: KeyPair[] = [];
            const properties = Object.keys(errors);

            for (let property of properties) {
                const messages = errors[property];
                if (messages instanceof Array) {
                    for (let message of messages) {
                        result.push({ key: property, value: message });
                    }
                }
            }
            return result;
        }
        return null;
    }
}