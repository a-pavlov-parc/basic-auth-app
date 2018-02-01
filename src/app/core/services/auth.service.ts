import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Store, Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { isEmpty } from 'lodash';

import * as authActions from '../state/actions/auth.actions';
import * as fromAuthActions from '../../core/state/actions/auth.actions';
import { AuthLoginFailAction, AuthSignUpFailAction } from '../state/actions/auth.actions';
import { IAuthSignInRequest, IAuthSignUpRequest } from '../interfaces';
import { UserService } from '@user/services/user.service';

@Injectable()
export class AuthService {
    redirectUrl: string;
    loggedInSuccessfully$: Observable<Action> = this.actions$.ofType(fromAuthActions.authActionTypes.AUTH_LOGIN_SUCCESS);
    loggedInFailure$: Observable<HttpErrorResponse> = this.actions$.ofType(fromAuthActions.authActionTypes.AUTH_LOGIN_FAIL).map((action: AuthLoginFailAction) => action.payload);
    signedUpSuccessfully$: Observable<Action> = this.actions$.ofType(fromAuthActions.authActionTypes.AUTH_SIGN_UP_SUCCESS);
    signedUpFailure$: Observable<HttpErrorResponse> = this.actions$.ofType(fromAuthActions.authActionTypes.AUTH_SIGN_UP_FAIL).map((action: AuthSignUpFailAction) => action.payload);
    isAuthorised$: Observable<boolean>;

    constructor(
        private store: Store<any>,
        private actions$: Actions,
        private userService: UserService
    ) {
        this.isAuthorised$ = Observable.combineLatest([
            this.userService.user$,
            this.userService.userIsBeingLoaded$
        ])
            .map(([user, userIsBeingLoaded]) => !isEmpty(user) || !!userIsBeingLoaded);
    }

    login(credentials: IAuthSignInRequest) {
        this.store.dispatch(new authActions.AuthLoginAction(credentials));
    }

    signUp(user: IAuthSignUpRequest) {
        this.store.dispatch(new authActions.AuthSignUpAction(user));
    }

    checkInitialState() {
        this.store.dispatch(new authActions.AuthCheckInitialStateAction());
    }

    logout() {
        this.store.dispatch(new authActions.AuthResetAction());
    }
}
