import { userActionTypes } from '../actions/user.actions';
import { IUser } from '@user/interfaces/user.interface';

export interface IUserState {
    user: IUser;
    userIsLoaded: boolean;
    userIsBeingLoaded: boolean;
}

export const initialUserStoreState: IUserState = {
    user: null,
    userIsLoaded: false,
    userIsBeingLoaded: false
};

export function userReducer(state: IUserState = initialUserStoreState, action): IUserState {
    switch (action.type) {
        case userActionTypes.USER_LOAD_CURRENT_USER: {
            return Object.assign({}, state, {
                userIsBeingLoaded: true
            });
        }

        case userActionTypes.USER_LOAD_CURRENT_USER_SUCCESS: {
            return Object.assign({}, state, {
                user: action.payload,
                userIsLoaded: true,
                userIsBeingLoaded: false
            });
        }

        case userActionTypes.USER_LOAD_CURRENT_USER_FAIL: {
            return Object.assign({}, state, {
                userIsLoaded: true,
                userIsBeingLoaded: false
            });
        }

        case userActionTypes.USER_RESET: {
            return initialUserStoreState;
        }

        default: {
            return state;
        }
    }
}
