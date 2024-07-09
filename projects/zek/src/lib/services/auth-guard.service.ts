import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';


export const zekAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    return authService.hasDataPermission(route.data);
}


@Injectable()
/**
 * @deprecated Please use canActivate
 * @see {@link canActivate}
 */
export class AuthGuardService implements CanActivate {
    constructor(protected readonly authService: AuthService, protected readonly router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }

        return this.authService.hasDataPermission(route.data);

        // const allowedRoles = route.data.roles;
        // let isInRole = this.authService.isInRole(allowedRoles);

        // const permission = route.data.permission;
        // let hasPermission = this.authService.hasPermission(permission);

        // return isInRole && hasPermission;
    }
}
