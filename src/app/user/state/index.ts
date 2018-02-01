import { ActionReducerMap } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as fromUserReducer from './reducers/user.reducer';

/**
 * We treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface UserModuleState {
    user: fromUserReducer.IUserState;
}

export const userModuleInitialState: UserModuleState = {
    user: fromUserReducer.initialUserStoreState
};

export const userModuleReducers: ActionReducerMap<UserModuleState> = {
    user: fromUserReducer.userReducer
};

// main selectors
export const getUserState = (state) => state.UserModule.user;

// selectors
export const getUser = createSelector(getUserState, (state: fromUserReducer.IUserState) => state.user);
export const getUserIsLoaded = createSelector(getUserState, (state: fromUserReducer.IUserState) => state.userIsLoaded);
export const getUserIsBeingLoaded = createSelector(getUserState, (state: fromUserReducer.IUserState) => state.userIsBeingLoaded);
