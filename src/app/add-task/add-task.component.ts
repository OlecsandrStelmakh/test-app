import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskName:string = "";
  taskText:string = "";

  constructor(public service:ServiceService) {}
  @Output() taskWasAdded = new EventEmitter<any>();
  addTask(){
    if (this.taskName && this.taskText){
      this.service.addTask({
        name : this.taskName,
        creator : localStorage.getItem('userLogined').split("/")[1],
        task: this.taskText,
        sharedwith: [localStorage.getItem('userLogined').split("/")[1]]
      })
      this.closeAddTaskComponent()
    }
  }
  closeAddTaskComponent(){
    this.taskWasAdded.emit(true)
  }
  
  ngOnInit() {
  }

}
