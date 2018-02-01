import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecaptchaComponent } from 'ng-recaptcha/recaptcha/recaptcha.component';
import { isEmpty } from 'lodash';
import * as md5 from 'md5';

import { AuthService } from '../../../core/services/auth.service';
import { IsDestroyedMixin } from '../../../shared/mixins/is-destroyed.mixin';
import { MessagesService } from '../../../core/services/messages.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends IsDestroyedMixin implements OnInit {
    @ViewChild(RecaptchaComponent) recaptcha:  RecaptchaComponent;
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
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login(captchaResponse: string) {
        if (!isEmpty(captchaResponse)) {
            this.formSubmitted = true;

            if (this.form.valid) {
                this.authService.login(Object.assign({}, this.form.value, {
                    passwordMd5: md5(this.form.value.password),
                    captcha: captchaResponse
                }));

                this.isLoading = true;

                this.authService.loggedInFailure$
                    .take(1)
                    .takeUntil(this.itIsDestroyed)
                    .subscribe(() => {
                        this.isLoading = false;

                        this.recaptcha.reset();
                        this.messagesService.showMessage('Something went wrong', 'DANGER');
                    });
            }
        }
    }
}
