import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modules
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { UserModule } from '@user/user.module';
import { MainRoutingModule } from './main-routing.module';

// components
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        MainRoutingModule,
        CoreModule.forRoot(),
        UserModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        LoginPageComponent
    ],
    bootstrap: [AppComponent]
})
export class MainModule {}
