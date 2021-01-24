import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{

    isLoginMode = true;
    isLoading = false;
    error: string = null;

    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    private onCloseSub: Subscription;

    constructor(
        private router: Router, 
        private authService: AuthService, 
        private componentFactoryResolver: ComponentFactoryResolver) { }
    
    ngOnDestroy(): void {
        if(this.onCloseSub != null) {
            this.onCloseSub.unsubscribe();
            this.onCloseSub = null;
        }
    }
      
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
            this.router.navigate(['/recipes'])
        }, errorMessage => {
            this.isLoading = false;
            this.error = errorMessage;
            this.showAlert(errorMessage);
            console.log(errorMessage);
        });

        form.reset();
    }

    private showAlert(message: string) {
        let alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        
        let alertHostViewContainer = this.alertHost.viewContainerRef;
        alertHostViewContainer.clear();

        const componentRef = alertHostViewContainer.createComponent(alertFactory);
        componentRef.instance.message = message;
        this.onCloseSub = componentRef.instance.onCloseAlert.subscribe(() => {
            this.onCloseSub.unsubscribe();
            alertHostViewContainer.clear();
        });
    }

    onHandleError() {
        this.error = null;
    }
}