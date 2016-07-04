import {Component, OnInit} from 'angular2/core';
import {FormBuilder, ControlGroup, Validators, Control} from 'angular2/common';
import {User} from './user';
import {AuthService} from './auth.service';
import {Router} from 'angular2/router';
import {ErrorService} from '../errors/error.service';

@Component({
    selector: 'my-signup',
    template: `
        <section class="col-md-8 col-md-offset-2">
            <form [ngFormModel]="myForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input [ngFormControl]="myForm.find('email')" type="text" id="email" class="form-control">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input [ngFormControl]="myForm.find('password')" type="password" id="password" class="form-control">
                </div>
                <button class="btn btn-primary" type="submit" [disabled]="!myForm.valid">Sign up</button>
            </form>
        </section>
    `
})
export class SigninComponent implements OnInit{
    myForm: ControlGroup;

    constructor(
        private _fb: FormBuilder, 
        private _authService: AuthService,
        private _router: Router,
        private _errorService: ErrorService
    ) { }

    onSubmit(){
        var user = new User(this.myForm.value.email, this.myForm.value.password);

        this._authService.signInUser(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this._router.navigateByUrl('/');
                },
                error => this._errorService.handleError(error)
            );
    }

    ngOnInit(){
        this.myForm = this._fb.group({
            email: ['', Validators.compose([Validators.required, this.isEmail])],
            password: ['', Validators.required],
        });
    }

    private isEmail(control: Control): {[s: string]: boolean} {
        if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
            return {invalidMail: true};
        }
    }
}