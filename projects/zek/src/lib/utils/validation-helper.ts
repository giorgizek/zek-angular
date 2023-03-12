export class ValidationHelper {
    static readonly emailRegExp = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    static isValidEmail(email?: string | null) {
        if (typeof email === 'undefined' || email == null || ((typeof email === 'string') && email.length === 0)) {
            return false;
        }

        return this.emailRegExp.test(email);
    }
}