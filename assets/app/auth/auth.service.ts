import {Injectable} from 'angular2/core';
import {User} from './user';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService{
    constructor(private _http: Http){}

    addUser(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-type': 'application/json'})
        return this._http.post('http://localhost:3000/user', body, {headers:headers})
            .map(response => response.json().obj
                // let user = new User(data.email, data.password, data.firstName, data.lastName);
                // return user;
            )
            .catch(error => Observable.throw(error.json()));
    }
    removeUser(user: User){
         return this._http.delete('http://localhost:3000/user/' + user.email)
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));        
    }
    signInUser(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-type': 'application/json'})
        return this._http.post('http://localhost:3000/user/signin', body, {headers: headers})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }
    logout(){
        localStorage.clear();
    }
    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }
    isOwner(userId: string){
        return localStorage.getItem('userId') == userId;
    }
    updateUser(user: User){
        
    }
}