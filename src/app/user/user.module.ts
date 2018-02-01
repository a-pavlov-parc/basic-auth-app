import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserRoutingModule } from './user-routing.module';

// providers
import { UserApiService } from './services/user.api.service';
import { UserService } from './services/user.service';

// ngrx staff
import { userModuleReducers, userModuleInitialState } from './state';
import { UserEffects } from './state/effects/user.effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('UserModule', userModuleReducers, { initialState: userModuleInitialState }),
        EffectsModule.forFeature([UserEffects]),
        UserRoutingModule
    ],
    declarations: []
})
export class UserModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UserModule,
            providers: [
                UserApiService,
                UserService
            ]
        };
    }
}

