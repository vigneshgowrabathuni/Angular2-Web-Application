import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthenticationService } from '../_services/index';
import {MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
  // providers: [UserService]
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public snackBar: MdSnackBar
  ){}
  ngOnInit(){
    this.authenticationService.logout();
  }
  login(){
    this.authenticationService.login(
      this.model.eMail, this.model.password
    )
    .subscribe(result =>{
      console.log(result);
      if(result === true){
        //login succesful
        // localStorage.setItem('loggedin', 'true');
        this.router.navigateByUrl('/dashboard');
      }else{
        // login failed
        this.snackBar.open('Email ID or Password is Incorrect', 'Oops!', {
          duration: 3000
        });
        this.loading = false;
      }
    });
  }
}
