import {Component} from 'angular2/core';
import {MessageService} from './messages/message.service';
import {HeaderComponent} from './header.component';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {MessagesComponent} from './messages/messages.component';
import {AuthenticationComponent} from './auth/auth.component';
import {SignupComponent} from './auth/signup.component';
import {ErrorComponent} from './errors/error.component';

@Component({
    selector: 'my-app',
    template: `  
        <div class="container">
            <my-header></my-header>
            <router-outlet></router-outlet>
        </div>
        <error-component></error-component>
    `,
    directives: [HeaderComponent, ROUTER_DIRECTIVES, ErrorComponent]
})
@RouteConfig([
    {path: '/', name: 'Messages', component: MessagesComponent, useAsDefault:true},
    {path: '/auth/...', name: 'Authentication', component: AuthenticationComponent}
])
export class AppComponent {
    
}