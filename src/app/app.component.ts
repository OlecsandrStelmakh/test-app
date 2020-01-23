import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[]
})
export class AppComponent implements OnInit {
  userLogined = {
    logIn: false,
    name: '',
    email: '',
  };
  signIn:boolean = false;
  logIn:boolean = false;
  newTask:boolean = false;

  constructor(public service:ServiceService) {
    if (localStorage.userLogined){
    let  data = localStorage.getItem('userLogined').split("/")
    this.userLogined = {
      logIn: true,
      name: data[0],
      email: data[1],
    };
    this.logIn = false;
    this.signIn = false;
    }
  }

  toogle(el){
    this[el] = !this[el];
  }

  letSignIn(){
    this.signIn = !this.signIn;
    this.logIn = false;
  }
  letLogIn(){
    this.logIn = !this.logIn;
    this.signIn = false;
  }
  letLogOut(){
    this.service.logOut();
    this.signIn = false;
  }
  createTask(){
    this.newTask = !this.newTask;
  }

  ngOnInit(){
    this.service.userLogined.subscribe(
      (value) => {
        this.userLogined = value;
        this.logIn = !this.logIn;
        this.signIn = false;
      }
    )
  }
}
