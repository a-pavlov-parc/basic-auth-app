import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '@core/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    isAuthorised$: Observable<boolean> = this.authService.isAuthorised$;

    constructor(
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.authService.checkInitialState();
    }
}
