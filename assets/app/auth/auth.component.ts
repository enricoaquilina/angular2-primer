import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {SigninComponent} from './signin.component';
import {SignupComponent} from './signup.component';
import {LogoutComponent} from './logout.component';
import {AuthService} from './auth.service';

@Component({
    selector: 'auth-component',
    template: `
        <header class="row">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-pills">
                    <li><a [routerLink]="['Signup']">Sign up</a></li>
                    <li><a [routerLink]="['Signin']" *ngIf="!isLoggedIn()">Sign in</a></li>
                    <li><a [routerLink]="['Logout']" *ngIf="isLoggedIn()">Logout</a></li>
                </ul>
            </nav>
        </header>
        <div class="row spacing">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [ ROUTER_DIRECTIVES],
    styles: [ `
        .router-link-active {
            color: #555;
            cursor: default;
            background-color: #fff;
            border: 1px solid #ddd;
            border-bottom-color: transparent;
        }
    `]
})
@RouteConfig([
    {path: '/signin', name: 'Signin', component: SigninComponent, useAsDefault: true},
    {path: '/signup', name: 'Signup', component: SignupComponent},
    {path: '/logout', name: 'Logout', component: LogoutComponent},
])
export class AuthenticationComponent{
    constructor(private _authService: AuthService) {}

    isLoggedIn(){
        return this._authService.isLoggedIn();
    }
}