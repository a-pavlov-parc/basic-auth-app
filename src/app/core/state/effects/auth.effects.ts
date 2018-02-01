import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { isEmpty } from 'lodash';

import { AuthApiService } from '../../services/auth.api.service';
import { TokenService } from '../../services/token.service';
import * as fromAuthActions from '../actions/auth.actions';
import * as fromUserActions from '@user/state/actions/user.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private router: Router,
        private actions$: Actions,
        private authApiService: AuthApiService,
        private tokenService: TokenService
    ) {}

    @Effect() init$: Observable<Action> = this.actions$
        .ofType(fromAuthActions.authActionTypes.AUTH_CHECK_INITIAL_STATE)
        .map(() => this.tokenService.token)
        .map(token => !isEmpty(token) ? new fromAuthActions.AuthCheckHasTokenAction(token) : new fromAuthActions.AuthCheckHasNoTokenAction());

    @Effect() login$: Observable<Action> = this.actions$
        .ofType(fromAuthActions.authActionTypes.AUTH_LOGIN)
        .switchMap((action: fromAuthActions.AuthLoginAction) => {
            return this.authApiService.signIn(action.payload)
                .map(result => new fromAuthActions.AuthLoginSuccessAction(result))
                .catch((error: HttpErrorResponse) => Observable.of(new fromAuthActions.AuthLoginFailAction(error)));
        });

    @Effect() loginSuccess$: Observable<Action> = this.actions$
        .ofType(fromAuthActions.authActionTypes.AUTH_LOGIN_SUCCESS)
        .do(() => {
            this.router.navigate(['/dashboard']);
        })
        .mergeMap((action: fromAuthActions.AuthLoginSuccessAction) => {
            return [
                new fromUserActions.UserLoadCurrentUserSuccess(action.payload.user),
            ];
        });

    @Effect({ dispatch: false }) setToken$: Observable<any> = this.actions$
        .ofType(fromAuthActions.authActionTypes.AUTH_SET_TOKEN)
        .map((action: fromAuthActions.AuthSetTokenAction) => action.payload)
        .do((token) => this.tokenService.token = token);

    @Effect({ dispatch: false }) reset$: Observable<Action> = this.actions$
        .ofType(fromAuthActions.authActionTypes.AUTH_RESET, fromUserActions.userActionTypes.USER_LOAD_CURRENT_USER_FAIL)
        .do(() => {
            this.tokenService.remove();
            this.router.navigate(['/signin']);
        });
}
