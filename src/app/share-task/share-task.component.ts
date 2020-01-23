import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-share-task',
  templateUrl: './share-task.component.html',
  styleUrls: ['./share-task.component.css']
})
export class ShareTaskComponent implements OnInit {
  @Input('shareTaskInfo') task;
  @Output() taskWasShared = new EventEmitter<boolean>()
  users;
  shareWithUser;
  constructor(public service:ServiceService) {}

  share(){
    if (this.shareWithUser){
      if (!this.task.shared){
        this.task.shared = [{name : this.shareWithUser, sharedBy : localStorage.getItem('userLogined').split("/")[1]}];
      } else {
        this.task.shared.push({name : this.shareWithUser, sharedBy : localStorage.getItem('userLogined').split("/")[1]});
      }
      if (!this.task.sharedwith){
        this.task.sharedwith = [this.shareWithUser];
      } else {
        this.task.sharedwith.push(this.shareWithUser);
      }
      this.service.saveChangedTask(this.task);
    }
    this.closeShareComponent()
  }

  closeShareComponent(){
    this.taskWasShared.emit(true);
  }

  ngOnInit() {
    let sharedwith = this.task.sharedwith;
    if (sharedwith){
      this.users = this.service.users.filter(function (el) {
        if (!sharedwith.includes(el.email))
        return el;
      })
      if (this.users[0] == undefined){
        this.users=false;
      };
    } else {
      this.users = this.service.users;
    }
  }
}
