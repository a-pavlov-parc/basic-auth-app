import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { UserRoutingModule } from './user-routing.module';

// providers
import { UserService } from './services/user.service';

// ngrx staff
import { userModuleReducers, userModuleInitialState } from './state';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('UserModule', userModuleReducers, { initialState: userModuleInitialState }),
        UserRoutingModule
    ],
    declarations: []
})
export class UserModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UserModule,
            providers: [
                UserService
            ]
        };
    }
}

