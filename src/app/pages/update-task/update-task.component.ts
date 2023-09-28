import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit{
  list_id : string;
  task_id : string;
  currentTask : any;
  updatedTaskTitle : string;

  title : string
  constructor (private taskService : TaskService, private route: ActivatedRoute, private router : Router){}

  ngOnInit(): void {
      this.route.params.subscribe((params : Params)=>{
        this.list_id = params.list_id;
        this.task_id = params.task_id;
        this.currentTask = params;
        
        this.taskService.getOneListTask(this.list_id , this.task_id).subscribe((res : any) =>{
          this.title = res.title;          
        });
      });
  }
  updateListTask(updatedTitle : string){
    // now here we will send the request to the API for updating the Title
    this.taskService.updateListTask(this.currentTask, updatedTitle).subscribe((res)=>{
      this.router.navigate(['../../'],{relativeTo:this.route});     
    });
  }  
}
