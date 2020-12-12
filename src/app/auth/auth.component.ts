import { Component } from '@angular/core'
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service'

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = false;

    constructor(private authService: AuthService) { }

    public onSwithMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    public onSubmit(form: NgForm) {
        if (!form.value) {
            return;
        }
        console.log(form.value);
        const email = form.value.email;
        const password = form.value.password;

        if (this.isLoginMode) {
            
        } else {
            this.authService.signUp(email, password)
            .subscribe(responseData => {
                console.log(responseData);
            }, error => {
                console.log(error);
            });
        }

        form.reset();
    }
}