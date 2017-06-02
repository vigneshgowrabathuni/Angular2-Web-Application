import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  inputs:['users']
})
export class AppComponent {
  title = 'Hello World!';
}
