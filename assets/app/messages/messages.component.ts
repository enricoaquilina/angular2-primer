import {Component} from 'angular2/core';
import {MessageListComponent} from './message-list.component';
import {MessageDetailComponent} from './message-detail.component';

@Component({
    selector: 'messages',
    template: `
        <div class="row">
            <message-detail></message-detail>
        </div>   
        <div class="row">
            <message-list></message-list>
        </div>
    `,
    directives: [MessageListComponent, MessageDetailComponent],

})
export class MessagesComponent{

}