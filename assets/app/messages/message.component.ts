import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Message} from './message';
import {MessageService} from './message.service';
import {AuthService} from '../auth/auth.service';
import {ErrorService} from '../errors/error.service';

@Component({
    selector: 'message-area',
    template: `
        <article class="panel panel-default" *ngIf="show" [ngStyle]="{'background-color':color}" (mouseenter)="color='cyan'" (mouseleave)="color='white'">
            <div class="panel-body">
                {{message.content}}
            </div>
            <footer class="panel-footer">
                <div class="author">
                    {{message.firstName}}
                </div>
                <div class="config" *ngIf="isCreator()">
                    <a (click)="editMessage()">Edit</a>
                    <a (click)="deleteMessage()">Delete</a>
                </div>
            </footer>
        </article>
    `,
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `],

})
export class MessageComponent{
    @Input() message: Message;
    @Output() editClicked = new EventEmitter<string>();

    constructor(
        private _messageService: MessageService, 
        private _authService: AuthService, 
        private _errorService: ErrorService
    ){};

    color = 'white';
    show = true;

    editMessage(){
        this._messageService.editMessage(this.message);
    }
    deleteMessage(){
        this._messageService.deleteMessage(this.message)
            .subscribe(
                data => console.log(data),
                error => this._errorService.handleError(error)
            );
    }
    isCreator(){
        return this._authService.isOwner(this.message.userId);
    }
}