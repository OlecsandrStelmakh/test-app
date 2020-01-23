import { Injectable, EventEmitter, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService implements OnInit{

  userLogined = new EventEmitter<any>();
  viewUserTasks = new EventEmitter<any>();
  emailUsed = new EventEmitter<any>();
  tasksData=[];
  users=[];
  tasks = [];
  constructor() {
    this.downloadUsers();
    this.downloadTasks();
    this.checklog();
  }
  
  recordTasks(){
    localStorage.setItem('tasks', JSON.stringify(this.tasksData));
  }

  downloadTasks(){
    this.tasksData = JSON.parse(localStorage.getItem('tasks'));
    if(!this.tasksData){
      this.tasksData=[];
    }
  }

  showUserTasks(){
    this.downloadTasks()
    let user = localStorage.getItem('userLogined').split("/")
    this.tasks = this.tasksData.filter((task)=>{
      if(task.creator == user[1]){
       return task
      } else if (task.sharedwith) {
       if ( task.sharedwith.includes(user[1])){
        return task;
       }
      }
   })
   this.viewUserTasks.emit(this.tasks);
  }

  addTask(task){
    if(task){
      task.id = Date.now();
      this.tasksData.push(task);
      this.recordTasks();
    }
    this.showUserTasks()
  }

  deleteTask(id){
    let taskIndex = this.tasksData.findIndex((el)=>{
      return el.id == id })
    this.tasksData.splice(taskIndex,1);
    this.recordTasks();
    this.showUserTasks();
  }

  saveChangedTask(task){
    let taskIndex = this.tasksData.findIndex((el)=>{
      return el.id == task.id })
    this.tasksData[taskIndex]= task;
    this.recordTasks();
    this.showUserTasks();
  }
  
  checklog(){
    if (localStorage.userLogined){
      let  data = localStorage.getItem('userLogined').split("/")
      this.userLogined.emit({
        logIn: true,
        name: data[0],
        email: data[1],
      })
      this.showUserTasks();
    };
  }

  recordUsers(){
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  downloadUsers(){
    this.users=JSON.parse(localStorage.getItem('users'));
    if(!this.users){
      this.users=[];
    }
  }

  addNewUser(newUser) {
    let exist = false;
    this.users.find(function (item) {
      if (item.email == newUser.email){
        exist = true;
      }
    })
    if (exist) {
      this.emailUsed.emit('true');
    } else {
      if (!this.users){
        this.users = [newUser];
      } else {
        this.users.push(newUser);
      };
      this.recordUsers();
      this.checkUser(newUser);
      this.checklog();
    }
  }

  checkUser(user){
    this.users.find(function (item) {
      if (item.email == user.email && item.password == user.password){
        localStorage.setItem('userLogined', item.name+"/"+item.email);
      }
    })
    this.checklog();
  }

  logOut(){
    localStorage.removeItem('userLogined');
    this.userLogined.emit({
      logIn: false,
      name: '',
      email: '',
    })
  }

  ngOnInit() {
  }
}
