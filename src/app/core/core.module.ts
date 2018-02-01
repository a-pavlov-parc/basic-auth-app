import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LocalStorageModule } from 'angular-2-local-storage';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import './operators';

// components
import { MessagesComponent } from './components/messages/messages.component';

// providers
import { AuthService } from './services/auth.service';
import { AuthApiService } from './services/auth.api.service';
import { TokenService } from './services/token.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthPagesGuard } from './guards/not-auth-pages.guard';
import { MessagesService } from './services/messages.service';

// ngrx related things
import { AuthEffects } from './state/effects/auth.effects';
import { coreReducers, coreModuleInitialState } from './state';

import { interceptors } from './interceptors';

const components = [
    MessagesComponent
];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(coreReducers, {
            initialState: coreModuleInitialState
        }),
        EffectsModule.forRoot([AuthEffects]),
        LocalStorageModule.withConfig({
            prefix: 'basic-auth-app',
            storageType: 'localStorage'
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25
        })
    ],
    exports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ...components
    ],
    declarations: [
        ...components
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                AuthService,
                AuthApiService,
                TokenService,
                MessagesService,
                AuthGuard,
                NotAuthPagesGuard,
                ...interceptors
            ]
        };
    }
}
