import {Component, OnInit} from 'angular2/core';
import {MessageComponent} from './message.component';
import {Message} from './message';
import {MessageService} from './message.service';
import {ErrorService} from '../errors/error.service';
import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'message-detail',
    template: `
        <section class="col-md-8 col-md-offset-2 spacing" *ngIf="isLoggedIn()">
            <form (ngSubmit)="onSubmit(f.value)" #f="ngForm">
                <div class="form-group">
                    <label for="content">Content</label>
                    <input type="text" ngControl="content" id="content" class="form-control" #input [ngModel]='message?.content'>
                </div>
                <button type="submit" class="btn btn-primary" [innerText]='message ? "Edit Message" : "Send Message"'></button>
                <button type="button" class="btn btn-danger" *ngIf="message" (click)="onClick()">Cancel</button>
            </form>             
        </section>
    `,
})
export class MessageDetailComponent implements OnInit{
    constructor(
        private _messageService: MessageService,
        private _errorService: ErrorService,
        private _authService: AuthService
    ) { }
    message: Message = null;

    onSubmit(form: any){        
        if(this.message){
            this.message.content = form.content;
            this._messageService.updateMessage(this.message)
                .subscribe(
                    data => console.log(data),
                    error => this._errorService.handleError(error)
                );
            this.message = null;
        } else {
            if(form.content){
                const message: Message = new Message(form.content);
                this._messageService.addMessage(message)
                    .subscribe(
                        data => {
                            this._messageService.messages.push(data);
                        },
                        error => this._errorService.handleError(error)
                    );
            }
        }
       
    }
    onClick(){
        this.message = null;
    }
    ngOnInit(){
        this._messageService.isEdit.subscribe(message => {
            this.message = message;
        })
    }
    isLoggedIn(){
        return this._authService.isLoggedIn();
    }

}