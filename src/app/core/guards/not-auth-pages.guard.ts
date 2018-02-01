import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';

import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { appDefaultPath } from '@core/core.constants';

@Injectable()
export class NotAuthPagesGuard implements CanActivate, CanActivateChild {
    constructor(
        private tokenService: TokenService,
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.tokenService.hasToken) {
            return true;
        }

        this.router.navigateByUrl(this.authService.redirectUrl || appDefaultPath);

        this.authService.redirectUrl = null;

        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}
