import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '@user/services/user.service';
import { IUser } from '@user/interfaces/user.interface';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {
    $user: Observable<IUser> = this.userService.userAfterLoading$;

    constructor(private userService: UserService) {}
}
