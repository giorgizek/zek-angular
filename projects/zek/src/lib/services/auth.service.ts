import { Injectable, } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { KeyPair, LoginToken, LoginUser } from '../models';
import { DateHelper, ObjectHelper, StorageHelper } from '../utils';
import { BitwiseHelper } from '../utils/bitwise-helper';

@Injectable()
export class AuthService {
    static USER_KEY = 'user';
    static REFRESH_TOKEN_INTERVAL = 15 * 60 * 1000;

    private _auth = false;
    private _user: LoginUser | null = null;
    private _timerId: any;
    private _refreshTimerId: any;

    constructor() {
        const user = StorageHelper.get(AuthService.USER_KEY);
        if (user) {
            this._init(user);
        }
    }


    private get _isAuthenticated() {
        const expired = this.getExpired()
        return new Date() < expired;
    }



    get user() {
        return this._user;
    }
    get isAuthenticated() {
        return this._auth;
    }



    private _starTimer() {
        this._stopTimer();

        if (this._user) {
            this._timerId = setInterval(() => {
                this._onTick();
            }, 1000);
        }
    }
    private _stopTimer() {
        if (typeof this._timerId === 'number') {
            clearInterval(this._timerId);
        }
    }

    private _onTick() {
        const newValue = this._isAuthenticated;
        if (this._auth !== newValue) {
            this._auth = newValue;
            if (!newValue) {
                this.logout();
            }
        }
    }


    private _starRefreshTokenTimer() {
        this._stopRefreshTokenTimer();

        const interval = AuthService.REFRESH_TOKEN_INTERVAL;
        if (interval > 0 && this._user) {
            this._refreshTimerId = setInterval(() => {
                this.emitOnRefreshToken();
            }, interval);
        }
    }
    private _stopRefreshTokenTimer() {
        if (typeof this._refreshTimerId === 'number') {
            clearInterval(this._refreshTimerId);
        }
    }
    emitOnRefreshToken() {
        if (this._onRefreshTokenSubject) {
            this._onRefreshTokenSubject.next();
        }
    }





    emitOnSignedIn() {
        if (this._onSignedInSubject) {
            this._onSignedInSubject.next(this._auth);
        }
    }

    private _onSignedInSubject?: Subject<boolean>;//BehaviorSubject is for initial firt value = false
    private _onSignedInObservable?: Observable<boolean>;
    get onSignedIn(): Observable<boolean> {
        if (!this._onSignedInSubject) {
            this._onSignedInSubject = new Subject<boolean>();//(this.isAuthenticated);
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



    login(user: LoginToken | LoginUser) {
        StorageHelper.set(AuthService.USER_KEY, user);
        this._init(user);
    }
    private _init(user: LoginToken | LoginUser) {
        if (user) {
            //convert string to local date/time
            user.expired = ObjectHelper.isDefined(user.expired) ? DateHelper.parseDate(user.expired) : user.expired;

            if (Array.isArray(user.roles)) {
                user.roles = user.roles.map(function (e: any) { return e ? e.toUpperCase() : e; });
            }
        }
        this._user = user as any;
        //if old value was false and we set true then we need to emit
        if (!this._auth) {
            this._auth = true;
            this.emitOnSignedIn();
        }

        this._starTimer();
        this._starRefreshTokenTimer();
    }

    logout() {
        StorageHelper.set(AuthService.USER_KEY, null);
        this._user = null;
        if (this._auth) {
            this._auth = false;
            this.emitOnSignedIn();
        }

        this._stopTimer();
        this._stopRefreshTokenTimer();
    }

    /**
     *
     * @returns user expiry date. if user is null returns min JS date
     */
    protected getExpired() {
        return this.user?.expired ?? new Date(0);
    }

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