import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {
  
  @Output() closeSingIn = new EventEmitter<boolean>()
  userInfo = {
    emailExists : false,
    passwordWrong : false,
    emailWrong : false,
    nameWrong : false,
  }
  name;
  email;
  password;
  constructor(public service:ServiceService) { }

  singIn(){
    console.log(this.name)
    console.log(this.password)
    this.userInfo.emailExists = false;
    this.userInfo.passwordWrong = false;
    this.userInfo.emailWrong = false;
    this.userInfo.nameWrong = false;
    this.checkName();
    this.checkEmail();
    this.checkPasword();
    if (!!this.name && !!this.email && !!this.password){
      this.service.addNewUser({
        name : this.name,
        email: this.email,
        password: this.password
      })
    } else {
      this.name = '';
      this.email = '';
      this.password = '';
    }
  }

  closeSingInComponent(){
    this.closeSingIn.emit(true);
  }

  checkName(){
    if  ( !this.name || this.name.length < 1){
      this.name = '';
      this.userInfo.nameWrong = true;
    }
  }

  checkPasword(){
    if ( !this.password || this.password.length<8){
      this.password = '';
      this.userInfo.passwordWrong = true;
    }
  }

  checkEmail(){
    if  (!this.email || !this.email.includes("@")){
      this.email = '';
      this.userInfo.emailWrong = true;
    }
  }

  ngOnInit() {
    this.service.emailUsed.subscribe(
      (value) => {
        this.userInfo.emailExists = value;
        this.name = '';
        this.email = '';
        this.password = '';
      }
    )
  }
}
