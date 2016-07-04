import {Component} from 'angular2/core';
import {MessageListComponent} from './messages/message-list.component';
import {MessageDetailComponent} from './messages/message-detail.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'my-header',
    template: `
        <header class="row">
            <nav class="col-md-8 col-md-poffset-2">
                <ul class="nav nav-pills">
                    <li><a [routerLink]="['Messages']">Messenger</a></li>
                    <li><a [routerLink]="['Authentication']">Authentication</a></li>
                </ul>
            </nav>
        </header>
    `,
    directives: [MessageListComponent, MessageDetailComponent, ROUTER_DIRECTIVES],
    styles: [`
        header {
            margin-bottom: 20px;
        }
        ul{
            text-align: center;
        }
        li{
            float: none;
            display: inline-block;
        }
        .router-link-active {
            background-color: #337ab7;
            color:white;

        }
    `]
})
export class HeaderComponent{

}