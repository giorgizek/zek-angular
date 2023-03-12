import { Captcha } from './captcha.model';

export interface LoginBase {
    id?: number | null;
    userName?: string | null;
    roles?: string[] | null;
    permissions?: { [id: number]: number; } | null;
    token?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    fullName?: string | null;
    position?: string | null;
    company?: string | null;
}
export interface LoginToken extends LoginBase {
    expired?: string | null;
    refreshTokenTime?: string | null;
}
export interface LoginUser extends LoginBase {
    expired?: Date | null;
    refreshTokenTime?: Date | null;
}

export interface Login extends Captcha {
    userName?: string;
    rememberMe?: boolean;
    password?: string;
}