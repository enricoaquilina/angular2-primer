import {Component, OnInit} from 'angular2/core';
import {Error} from './error';
import {ErrorService} from './error.service';

@Component({
    selector: 'error-component',
    template: `
        <div class="backdrop" [ngStyle]="{'display': errorDisplay}"></div>
        <div class="modal" tabindex="-1" role="dialog" [ngStyle]="{'display': errorDisplay}">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" (click)="onErrorHandle()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">{{currentError?.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <p>{{currentError?.description}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" (click)="onErrorHandle()">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .backdrop {
            background-color: rgba(0,0,0,0.6);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
        }
    `],
})
export class ErrorComponent implements OnInit{
    currentError: Error = null;
    errorDisplay : string = 'none';

    constructor(private _errorService: ErrorService){}

    ngOnInit(){
        this._errorService.errorOccurred
        .subscribe(error => {
            this.currentError = error;
            this.errorDisplay = 'block';
        })
    }
    onErrorHandle(){
        this.errorDisplay = 'none';
    }
}