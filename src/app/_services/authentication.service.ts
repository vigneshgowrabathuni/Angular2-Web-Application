import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(eMail: string, password: string): Observable<boolean> {
      console.log("Email "+eMail+" Password "+password);
        return this.http.post('/api/authenticate', ({ eMail: eMail, password: password}))
            .map((response: Response) => {
              console.log(response);
              console.log(response.json().token);
              console.log(response.json().userName)
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                let uName = response.json().userName;
                console.log(uName);
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ eMail: eMail, token: token, userName: uName }));
                    localStorage.setItem('lUser', uName);
                    console.log(token);
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });

    }

    logout(): void {
        // clear token remove user from local storage to log user out
        console.log(this.token);
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
