import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  inputs:['users']
})
export class UsersListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
