import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { IUser } from '@user/interfaces/user.interface';
import * as userActions from '../state/actions/user.actions';
import * as fromUserState from '../state';;

@Injectable()
export class UserService {
    user$: Store<IUser> = this.store.select(fromUserState.getUser);
    userIsLoaded$: Store<boolean> = this.store.select(fromUserState.getUserIsLoaded);
    userIsBeingLoaded$: Store<boolean> = this.store.select(fromUserState.getUserIsBeingLoaded);
    userAfterLoading$: Observable<IUser>;

    constructor(private store: Store<fromUserState.UserModuleState>) {
        this.userAfterLoading$ = this.userIsLoaded$
            .filter(loaded => loaded)
            .switchMapTo(this.user$)
            .first();
    }

    reset() {
        this.store.dispatch(new userActions.UserReset());
    }
}
