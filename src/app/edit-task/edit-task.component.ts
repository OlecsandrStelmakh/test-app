import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Input('editTaskInfo') task;
  @Output() taskWasChanged = new EventEmitter<boolean>()
  taskName;
  taskText;
  
  constructor(public service:ServiceService) {
  }

  ngOnInit() {
    this.taskName = this.task.name;
    this.taskText = this.task.task;
  }

  save() {
    this.task.name = this.taskName;
    this.task.task = this.taskText;
    this.service.saveChangedTask(this.task);
    this.taskWasChanged.emit(true);
  }

  colseEditComponent() {
    this.taskWasChanged.emit(true);
  }
}
