import { Injectable, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KeyPair, LoginToken } from '../models';
import { StorageHelper } from '../utils';
import { BitwiseHelper } from '../utils/bitwise-helper';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private subject = new BehaviorSubject<boolean>(false);//todo check if need BehaviorSubject
    protected model?: LoginToken | null = null;
    private expired: Date | null = null;

    private oldValueIsAuthenticated: boolean = false;
    isAuthenticated(): boolean {
        let expired = this.getExpired();
        if (!expired) expired = new Date(0);//Date.minDate();

        const newValue = new Date() < expired;
        if (this.oldValueIsAuthenticated != newValue) {
            this.oldValueIsAuthenticated = newValue;
            this.subject.next(newValue);

            //if user is signed in and expired we need to logout (remove from localStorage)
            if (!newValue) {
                this.logout();
            }
            return newValue;
        }
        return newValue;
    }

    isSignedIn() {
        return this.subject.asObservable();
    }

    login(tmp?: LoginToken | null) {
        if (tmp) {
            //Globals.setServerDate(tmpModel.currentDateTime);

            //this.permissionsService.flushPermissions();
            if (tmp.roles) {
                tmp.roles = tmp.roles.map(function (e) { return e.toUpperCase(); });
                //this.permissionsService.loadPermissions(model.roles);
            }
        }

        //delete tmpModel.currentDateTime;
        this.model = tmp;
        this.expired = null;
        StorageHelper.set('login', this.model);
        this.isAuthenticated();//this method need to execute subject.next();
    }
    logout() {
        this.login(null);
    }

    getUser(): LoginToken | undefined | null {
        if (!this.model) {
            this.model = StorageHelper.get('login');
        }
        return this.model;
    }
    protected getExpired(): Date | undefined | null {
        if (!this.expired) {
            const tmp = this.getUser();
            if (tmp && tmp.expired) {
                this.expired = new Date(tmp.expired);
            }
        }
        return this.expired;
    }


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

        const tmp = this.getUser();
        const userPermissions = tmp ? tmp.permissions : null;
        if (!userPermissions) {
            return false;
        }

        if (value) {
            for (let i = 0; i < permissions.length; i++) {
                const p = permissions[i];
                let found = userPermissions[p];
                if (found) {
                    let hasPermission = BitwiseHelper.HasFlag(found, value);
                    if (hasPermission)
                        return true;
                }
            }
        } else {
            for (let i = 0; i < permissions.length; i++) {
                const p = permissions[i];
                let found = userPermissions[p];
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

        let hasPermission = this.hasPermission(permission);

        // return isInRole && hasPermission;
        return hasPermission;
    }
}