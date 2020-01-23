import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';

import { ServiceService } from './service.service';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ShareTaskComponent } from './share-task/share-task.component';

@NgModule({
  declarations: [
    AppComponent,
    SingInComponent,
    LogInComponent,
    ViewTasksComponent,
    AddTaskComponent,
    EditTaskComponent,
    ShareTaskComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
