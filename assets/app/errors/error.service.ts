import {Injectable, EventEmitter} from 'angular2/core';
import {Error} from './error';

@Injectable()
export class ErrorService{
    errorOccurred = new EventEmitter<Error>();

    handleError(error: any){
        const errorData = new Error(error.title, error.error.message);
        this.errorOccurred.emit(errorData);
    }
}