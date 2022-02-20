import { Captcha } from './captcha.model';

export class LoginToken {
    id?: number;
    userName?: string;
    roles?: string[];
    //permissions?: KeyPair<number, number>[];
    permissions?: { [id: number] : number; };
    token?: string;
    expired?: string;
    fullName?: string
    position?: string
}
export class LoginTokenDTO extends LoginToken {
    //currentDateTime: Date;
}

export class LoginDTO extends Captcha {
    userName?: string;
    rememberMe?: boolean;
    password?: string;
    company?: string;
}
