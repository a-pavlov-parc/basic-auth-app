import { ActionReducerMap } from '@ngrx/store';

export interface ICoreModuleState {
    [key: string]: any;
}
export const coreModuleInitialState: ICoreModuleState = {};
export const coreReducers: ActionReducerMap<ICoreModuleState> = {};
