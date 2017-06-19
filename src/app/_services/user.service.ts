import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/index';
import { User } from '../_models/index';

@Injectable()
export class UserService {
  private _getUrl = "/api/users";
  private _getUser = "/api/user";
  private _postUser = "/api/user";
  // loggedIn = localStorage.getItem('loggedIn');
  loginUser = localStorage.getItem('lUser');

  constructor(private _http:Http, private authenticationService: AuthenticationService) {
  }
  getUsers(): Observable<User[]>{
    // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
    return this._http.get(this._getUrl, options)
    .map((response: Response) => response.json());
  }
  getUser(){
    this._http.get(this._getUser)
    .map((response: Response) => response.json());
  }
  addUser(user){
    let headers = new Headers({ 'Content-Type':'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this._http.post(this._postUser, JSON.stringify(user),options)
    .map((response: Response) => response.json());
  }
  onGoogleLogin(){
    // var params = {
    //   'clientid': '295969309884-999rvr6s4kl4b8fbkqr6cafl21m57fjk.apps.googleusercontent.com',
    //   'cookiepolicy':'',
    //   'callback':function(result){
    //       if(result['status']['signed_in']){
    //         var request = gapi.client.plus.people.get(
    //           {
    //             'userid': 'me'
    //           }
    //         );
    //         request.execute(function(resp){
    //           apply(function(){
    //
    //           });
    //         })
    //       }
    //   },
    //   'approvalprompt':'force',
    //   'scope':'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
    // };
    // gapi.auth.signin(params);
  }
}
