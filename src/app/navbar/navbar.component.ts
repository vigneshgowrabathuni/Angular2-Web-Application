import { Component, OnInit } from '@angular/core';
import { UserService } from './../_services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService]
})
export class NavbarComponent implements OnInit {
  loggedin = localStorage.getItem('loggedin');
  loginUser = localStorage.getItem('lUser');
  constructor(private _userService: UserService) { }

  ngOnInit() {
  }

}
