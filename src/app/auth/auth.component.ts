import { Component } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService) { }

    public onSwithMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    public onSubmit(form: NgForm) {
        if (!form.value) {
            return;
        }
        this.isLoading = true;
        this.error = null;
        console.log(form.value);
        const email = form.value.email;
        const password = form.value.password;

        let authResponseObservable = new Observable<AuthResponseData>();

        if (this.isLoginMode) {
            authResponseObservable = this.authService.login(email, password);
        } else {
            authResponseObservable = this.authService.signUp(email, password);
        }
        
        authResponseObservable.subscribe(responseData => {
            console.log(responseData);
            this.isLoading = false;
        }, errorMessage => {
            this.isLoading = false;
            this.error = errorMessage;
            console.log(errorMessage);
        });

        form.reset();
    }
}