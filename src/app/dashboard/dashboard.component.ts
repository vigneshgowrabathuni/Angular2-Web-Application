import { UserService } from './../_services/user.service';
import { User } from './../_models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService]
})
export class DashboardComponent implements OnInit {

  public myName = "Vignesh";
  users: Array<User>;
  public pie_ChartData = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7],
    ['Code', 7]];
  public pie_ChartOptions = {
    title: 'My Daily Activities',
    width: 800,
    height: 400
  };
    constructor(private _userService: UserService) { }

    ngOnInit() {
      this._userService.getUsers()
      .subscribe(resUserData => this.users = resUserData);
    }
  }
