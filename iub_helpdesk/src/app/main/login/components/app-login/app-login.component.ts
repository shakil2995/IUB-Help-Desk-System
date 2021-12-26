import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() { 
    console.log('hello');
  }

}
