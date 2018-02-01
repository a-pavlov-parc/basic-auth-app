import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { typeCacheUtil } from '@shared/utilities/type-cache.util';
import { IUser } from '@user/interfaces/user.interface';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const userActionTypes = {
    USER_LOAD_CURRENT_USER: typeCacheUtil('[User] Load current user'),
    USER_LOAD_CURRENT_USER_SUCCESS: typeCacheUtil('[User] Load current user success'),
    USER_LOAD_CURRENT_USER_FAIL: typeCacheUtil('[User] Load current user fail'),
    USER_RESET: typeCacheUtil('[User] Reset')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class UserLoadCurrentUser implements Action {
    readonly type = userActionTypes.USER_LOAD_CURRENT_USER;
}

export class UserLoadCurrentUserSuccess implements Action {
    readonly type = userActionTypes.USER_LOAD_CURRENT_USER_SUCCESS;

    constructor(public payload: IUser) {}
}

export class UserLoadCurrentUserFail implements Action {
    readonly type = userActionTypes.USER_LOAD_CURRENT_USER_FAIL;

    constructor(public payload: HttpErrorResponse) {}
}

export class UserReset implements Action {
    readonly type = userActionTypes.USER_RESET;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type UserActions = [
    UserLoadCurrentUser,
    UserLoadCurrentUserSuccess,
    UserLoadCurrentUserFail,
    UserReset
];
