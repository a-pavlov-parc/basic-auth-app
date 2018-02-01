import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IUser } from '@user/interfaces';

@Injectable()
export class UserApiService {
    constructor(private http: HttpClient) {}

    loadCurrent(): Observable<IUser> {
        return this.http.get<IUser>('/users/current');
    }
}
