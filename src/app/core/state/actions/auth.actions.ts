import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { typeCacheUtil } from '../../../shared/utilities/type-cache.util';
import { IAuthSignInResponse, IAuthSignInRequest, IAuthSignUpRequest } from '../../interfaces';
import { IUser } from '../../../user/interfaces';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */

export const authActionTypes = {
    AUTH_CHECK_INITIAL_STATE: typeCacheUtil('[Auth] Check initial state'),
    AUTH_CHECK_HAS_TOKEN: typeCacheUtil('[Auth] It has a token'),
    AUTH_CHECK_HAS_NO_TOKEN: typeCacheUtil('[Auth] It has no a token'),
    AUTH_LOGIN: typeCacheUtil('[Auth] Login'),
    AUTH_LOGIN_SUCCESS: typeCacheUtil('[Auth] Login success'),
    AUTH_LOGIN_FAIL: typeCacheUtil('[Auth] Login fail'),
    AUTH_SET_TOKEN: typeCacheUtil('[Auth] Set token'),
    AUTH_RESET: typeCacheUtil('[Auth] Reset')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class AuthCheckInitialStateAction implements Action {
    type = authActionTypes.AUTH_CHECK_INITIAL_STATE;
}

export class AuthCheckHasTokenAction implements Action {
    type = authActionTypes.AUTH_CHECK_HAS_TOKEN;

    constructor(public payload: string) {}
}

export class AuthCheckHasNoTokenAction implements Action {
    type = authActionTypes.AUTH_CHECK_HAS_NO_TOKEN;
}

export class AuthLoginAction implements Action {
    type = authActionTypes.AUTH_LOGIN;

    constructor(public payload: IAuthSignInRequest) {}
}

export class AuthLoginSuccessAction implements Action {
    type = authActionTypes.AUTH_LOGIN_SUCCESS;

    constructor(public payload: IAuthSignInResponse) {}
}

export class AuthLoginFailAction implements Action {
    type = authActionTypes.AUTH_LOGIN_FAIL;

    constructor(public payload: HttpErrorResponse) {
    }
}

export class AuthSetTokenAction implements Action {
    type = authActionTypes.AUTH_SET_TOKEN;

    constructor(public payload: string) {}
}

export class AuthResetAction implements Action {
    type = authActionTypes.AUTH_RESET;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AuthActions = [
    AuthCheckInitialStateAction,
    AuthCheckHasTokenAction,
    AuthCheckHasNoTokenAction,
    AuthLoginSuccessAction,
    AuthLoginFailAction,
    AuthSetTokenAction,
    AuthResetAction
];
