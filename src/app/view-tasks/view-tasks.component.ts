import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {
  tasks;
  editTaskComponent = false;
  shareTaskComponent = false;
  task;
  
  constructor(public service:ServiceService) {
    this.tasks = this.service.tasks;
  }

  deleteTask(id){
    this.service.deleteTask(id)
  }

  editTask(task){
    this.task = task;
    this.editTaskComponent = true;
  }

  wasChanged(){
    this.editTaskComponent = !this.editTaskComponent;
  }

  shareTask(task){
    this.shareTaskComponent = !this.shareTaskComponent;
    this.task = task;
  }

  wasShared(){
    this.shareTaskComponent = !this.shareTaskComponent;
  }

  ngOnInit() {
    this.service.viewUserTasks.subscribe(
      (value) => {
        this.tasks = value;
      }
    )
  }

}
