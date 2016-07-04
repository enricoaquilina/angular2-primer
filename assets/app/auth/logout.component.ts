import {Component} from 'angular2/core';
import {AuthService} from './auth.service';
import {Router} from 'angular2/router';

@Component({
    selector: 'my-logout',
    template: `
        <section class="col-md-8 col-md-offset-2">
            <button class="btn btn-danger" (click)="onLogout()">Log out</button>
        </section>
    `
})
export class LogoutComponent{
    constructor(private _auth: AuthService, private _router: Router){}

    onLogout(){
        this._auth.logout();
        this._router.navigate(['Signin']);
    }
}