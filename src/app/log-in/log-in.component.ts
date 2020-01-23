import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  wrongLogInfo = false;
  email;
  password;

  constructor(public service:ServiceService) { }
  
  chekInfo()  {
    this.service.checkUser({
      email: this.email,
      password: this.password,
    })
    this.wrongLogInfo = true;
  }
  
  ngOnInit() {
  }
  
}
