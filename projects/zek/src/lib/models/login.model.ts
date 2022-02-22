import { Captcha } from './captcha.model';

export interface LoginToken {
    id?: number | null;
    userName?: string | null;
    roles?: string[] | null;
    permissions?: { [id: number]: number; } | null;
    token?: string | null;
    expired?: string | null;
    fullName?: string | null;
    position?: string | null;
}

export interface Login extends Captcha {
    userName?: string;
    rememberMe?: boolean;
    password?: string;
}