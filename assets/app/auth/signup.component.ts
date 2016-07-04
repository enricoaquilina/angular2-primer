import {Component, OnInit} from 'angular2/core';
import {FormBuilder, ControlGroup, Validators, Control} from 'angular2/common';
import {User} from './user';
import {AuthService} from './auth.service';
import {ErrorService} from '../errors/error.service';
import {Router} from 'angular2/router';

@Component({
    selector: 'my-signup',
    template: `
        <section class="col-md-8 col-md-offset-2">
            <form  (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input [ngFormControl]="myForm.find('firstName')" type="text" id="firstName" class="form-control">
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input [ngFormControl]="myForm.find('lastName')" type="text" id="lastName" class="form-control">
                </div>
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
export class SignupComponent implements OnInit{
    myForm: ControlGroup;

    constructor(private _fb: FormBuilder, 
                private _authService: AuthService,
                private _errorService: ErrorService,
                private _router: Router
    ) { }

    onSubmit(){
        var formDetails = this.myForm.value;
        var user = new User(
            formDetails.email,
            formDetails.password,
            formDetails.firstName,
            formDetails.lastName
        )
        return this._authService.addUser(user)
            .subscribe(
                data => { 
                    console.log(data);
                    this._router.navigate(['Signin']);
                },
                error => this._errorService.handleError(error)
            )
    }

    ngOnInit(){
        this.myForm = this._fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
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