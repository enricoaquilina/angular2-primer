import {Component, OnInit} from 'angular2/core';
import {MessageComponent} from './message.component';
import {Message} from './message';
import {MessageService} from './message.service';
import {ErrorService} from '../errors/error.service';

@Component({
    selector: 'message-list',
    template: `
        <section class="col-ld-8 col-md-offset-2">
            <h3>Messages</h3>
            <message-area *ngFor="#message of messages" [message]="message" (editClicked)="message.content=$event"></message-area> 
        </section>
    `,
    directives: [MessageComponent]
})
export class MessageListComponent implements OnInit{
    messages: Message[];
    constructor(
        private _messageService: MessageService,
        private _errorService: ErrorService
    ) { }

    ngOnInit(){
        this._messageService.getMessages()
            .subscribe(
                data => {
                    this.messages = data;
                    this._messageService.messages = this.messages;
                },
                error => this._errorService.handleError(error)
            );
    }
}