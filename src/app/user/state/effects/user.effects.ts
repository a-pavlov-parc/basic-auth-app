import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UserApiService } from '../../services/user.api.service';
import { IUser } from '@user/interfaces/user.interface';
import * as fromUserActions from '../actions/user.actions';
import * as fromAuthActions from '@core/state/actions/auth.actions';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private userApiService: UserApiService
    ) {}

    @Effect() appHasToken$: Observable<Action> = this.actions$
        .ofType(
            fromAuthActions.authActionTypes.AUTH_CHECK_HAS_TOKEN,
            fromAuthActions.authActionTypes.AUTH_SET_TOKEN
        )
        .map(() => new fromUserActions.UserLoadCurrentUser());

    @Effect() loadUser$: Observable<Action> = this.actions$
        .ofType(fromUserActions.userActionTypes.USER_LOAD_CURRENT_USER)
        .switchMap(() => {
                return this.userApiService.loadCurrent()
                    .map((result: IUser) => new fromUserActions.UserLoadCurrentUserSuccess(result))
                    .catch((error: HttpErrorResponse) => Observable.of(new fromUserActions.UserLoadCurrentUserFail(error)));
            }
        );

    @Effect() authReset$: Observable<Action> = this.actions$
        .ofType(fromAuthActions.authActionTypes.AUTH_RESET)
        .map(() => new fromUserActions.UserReset());
}
