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

  loginUser = localStorage.getItem('lUser');

  constructor(private _http:Http, private authenticationService: AuthenticationService) { }
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
}
