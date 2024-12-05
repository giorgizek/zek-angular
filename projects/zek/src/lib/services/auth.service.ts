import { Injectable, } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { KeyPair, LoginToken, LoginUser } from '../models';
import { Convert, DateHelper, ObjectHelper, StorageHelper } from '../utils';
import { BitwiseHelper } from '../utils/bitwise-helper';

@Injectable()
export class AuthService {
    private _isInitialized = false;
    private _auth = false;
    private _user: LoginUser | null = null;

    static USER_KEY = 'user';
    // access_token

    get user() {
        if (!this._isInitialized) {
            const user = StorageHelper.get(AuthService.USER_KEY);
            this._init(user);
        }
        return this._user;
    }

    /**
     * Inits user (parses fields and starts refresh token timer if needed)
     * @param user user from json or storage
     */
    private _init(user: any){
        if (user) {
            //convert string to specified types
            user.expired = ObjectHelper.isDefined(user.expired) ? DateHelper.parseDate(user.expired) : user.expired;
            user.refreshTokenTime = ObjectHelper.isDefined(user.refreshTokenTime) ? DateHelper.parseDate(user.refreshTokenTime) : user.refreshTokenTime;

            if (Array.isArray(user.roles)) {
                user.roles = user.roles.map(function (e: any) { return e ? e.toUpperCase() : e; });
            }
        }
        this._user = user;
        this._isInitialized = true;
        this._starRefreshTokenTimer();
    }

    private _timerId: any;
    private _starRefreshTokenTimer() {
        this._stopRefreshTokenTimer();

        const user = this._user;
        if (user && user.refreshTokenTime) {
            let timeout = user.refreshTokenTime.getTime() - Date.now();// - (60 * 1000);

            if (timeout < 0) {
                this.emitOnRefreshToken();
            }

            const minRefreshTime = 60_000//1 min;
            if (timeout < minRefreshTime) {
                timeout = minRefreshTime;
            }

            this._timerId = setInterval(() => {
                this.emitOnRefreshToken();
            }, timeout);
        }
    }
    private _stopRefreshTokenTimer() {
        if (typeof this._timerId === 'number') {
            clearInterval(this._timerId);
        }
    }
    emitOnRefreshToken() {
        if (this._onRefreshTokenSubject) {
            this._onRefreshTokenSubject.next();
        }
    }


    private get _isAuthenticated() {
        const expired = this.getExpired()
        return new Date() < expired;
    }
    /**
     * Dynamic property. gets auth user and checks expired;
     */
    get isAuthenticated() {
        const newValue = this._isAuthenticated;
        if (this._auth !== newValue) {
            this._auth = newValue;

            //if user is signed in and expired we need to logout (remove from localStorage)
            if (!newValue) {
                this.logout();
            }
            return newValue;
        }
        return newValue;
    }

    emitOnSignedIn() {
        if (this._onSignedInSubject) {
            this._onSignedInSubject.next(this._auth);
        }
    }

    private _onSignedInSubject?: BehaviorSubject<boolean>;//BehaviorSubject is for initial firt value = false
    private _onSignedInObservable?: Observable<boolean>;
    get onSignedIn(): Observable<boolean> {
        if (!this._onSignedInSubject) {
            this._onSignedInSubject = new BehaviorSubject<boolean>(false);
            this._onSignedInObservable = this._onSignedInSubject.asObservable();
        }

        if (!this._onSignedInObservable)
            throw new Error("_onExecuteObservable is undefined");

        return this._onSignedInObservable;
    }


    private _onRefreshTokenSubject?: Subject<void>;
    private _onRefreshTokenObservable?: Observable<void>;
    get onRefreshToken(): Observable<void> {
        if (!this._onRefreshTokenSubject) {
            this._onRefreshTokenSubject = new Subject<void>();
            this._onRefreshTokenObservable = this._onRefreshTokenSubject.asObservable();
        }

        if (!this._onRefreshTokenObservable)
            throw new Error("onRefreshTokenObservable is undefined");

        return this._onRefreshTokenObservable;
    }



    private _login(user: any) {
        StorageHelper.set(AuthService.USER_KEY, user);
        this._isInitialized = false;//user get method will init user
        this._init(user);
        this._auth = ObjectHelper.isDefined(user);
        this.emitOnSignedIn();
    }
    login(user: LoginToken | LoginUser) {
        this._login(user);
    }
    logout() {
        this._login(null);
    }


    protected getExpired() {
        return this.user?.expired ?? new Date(0);// if getExpired is null return min JS date;
    }

    // protected getRefreshTokenExpired(): Date | null | undefined {
    //     const user = this.user;
    //     if (user) {
    //         return user.refreshTokenTime;
    //     }

    //     return null;
    // }


    // isInRole(allowedRoles: string[]): boolean {
    //     if (!allowedRoles || allowedRoles.length === 0) {
    //         return true;
    //     }

    //     const tmp = this.getUser();
    //     const roles = tmp ? tmp.roles : null;
    //     if (!roles || roles.length === 0) {
    //         return false;
    //     }

    //     let isInRole = allowedRoles.some(role => roles.indexOf(role) !== -1);
    //     return isInRole;
    // }


    hasPermission(permission?: KeyPair<number, number> | number | null): boolean {
        if (!permission) {
            return true;
        }

        let key = 0;
        let value: number | null | undefined;
        if (typeof permission === 'number' || typeof permission === 'string') {
            key = +permission;
        }// else if (Array.isArray(permission)) {
        // }
        else if (typeof permission === 'object') {
            if (!permission.key)
                return true;

            key = permission.key;
            value = permission.value;
        }

        return this.hasPermissions([key], value);
    }


    hasPermissions(permissions?: Array<number>, value?: number | null): boolean {
        if (!permissions || permissions.length === 0) {
            return true;
        }

        const user = this.user;
        const userPermissions = user ? user.permissions : null;
        if (!userPermissions) {
            return false;
        }

        if (value) {
            for (let i = 0; i < permissions.length; i++) {
                const p = permissions[i];
                const found = userPermissions[p];
                if (found) {
                    const hasPermission = BitwiseHelper.hasFlag(found, value);
                    if (hasPermission)
                        return true;
                }
            }
        } else {
            for (let i = 0; i < permissions.length; i++) {
                const p = permissions[i];
                const found = userPermissions[p];
                if (found)
                    return true;
            }
        }

        return false;
    }


    hasDataPermission(data: any) {
        //if (data === undefined || data === null) return true;
        // const allowedRoles = data.roles;
        // let isInRole = this.isInRole(allowedRoles);

        const permission = data.permission;

        const hasPermission = this.hasPermission(permission);

        // return isInRole && hasPermission;
        return hasPermission;
    }
}