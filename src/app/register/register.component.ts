import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {MdSnackBar} from '@angular/material';
import { UserService } from './../_services/user.service';
import { User } from './../_models/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
 newUser :Array<User>;
 myUser= [];
  constructor(
    private router: Router,
    public snackBar: MdSnackBar,
    private _userService:UserService
  ) { }

  ngOnInit() {
  }
  register(){
    console.log("register");
    var name = this.model.userName+"";
    var emailid = this.model.eMail+"";
    var password = this.model.password+"";
    var cpassword = this.model.cpassword+"";
    var uType = "user";
    var uData = {
          'userName': name,
          'eMail':emailid,
          'password':password,
          'userType':uType
        };
        this.myUser.push(uData);
    console.log(this.myUser[0]);
    this._userService.addUser(this.myUser[0]).subscribe(addNewUser =>{
      console.log(addNewUser);
      if(addNewUser == true){
        this.router.navigateByUrl('/login');
        swal("Good job!", "You are Successfully registered.", "success");
      }else{
        this.myUser = [];
        this.model.userName = "";
        this.model.eMail = "";
        this.model.password = "";
        this.model.cpassword = "";
        swal("Oops!", "User already exists.", "warning");
      }
    });
  }

}
