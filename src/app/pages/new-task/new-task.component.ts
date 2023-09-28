import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  listID : string;
  newTaskTitle : string = '';
  constructor(private taskService : TaskService, private route : ActivatedRoute,private router : Router){}

  ngOnInit(){
      this.route.params.subscribe((params : Params) => {
        this.listID = params.list_id;              
      });
  }
  
  createNewListTask(title : string){    
    this.taskService.createNewTaskList(title,this.listID).subscribe((task)=>{
      this.router.navigate(['../'],{relativeTo:this.route});
    });
  }
}
