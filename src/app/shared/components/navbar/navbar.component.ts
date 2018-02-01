import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '@core/services/auth.service';
import { UserService } from '@user/services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
    constructor(private authService: AuthService) {}

    logout() {
        this.authService.logout();
    }
}
