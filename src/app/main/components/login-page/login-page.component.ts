import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../core/services/auth.service';
import { IsDestroyedMixin } from '../../../shared/mixins/is-destroyed.mixin';
import { MessagesService } from '../../../core/services/messages.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends IsDestroyedMixin implements OnInit {
    form: FormGroup;
    formSubmitted: boolean = false;
    isLoading: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private messagesService: MessagesService
    ) {
        super();
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    login() {
        this.formSubmitted = true;

        if (this.form.valid) {
            this.authService.login(this.form.value);

            this.isLoading = true;

            this.authService.loggedInFailure$
                .take(1)
                .takeUntil(this.itIsDestroyed)
                .subscribe(() => {
                    this.isLoading = false;

                  this.messagesService.showMessage('Something went wrong', 'DANGER');
                });
        }
    }
}
