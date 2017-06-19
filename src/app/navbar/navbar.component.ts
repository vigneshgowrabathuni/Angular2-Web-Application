import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logVal = false;
  constructor(
    private authenticationService: AuthenticationService
  ){
    this.logVal = this.authenticationService.isLoggedIn();
  }
  ngOnInit() {
  }
  onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

}
