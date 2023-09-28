import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListService } from 'src/app/list.service';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  allLists : any;
  allListTask : any;
  current_list_id : string;
  is_all_complete : boolean = true;

  constructor(private listService : ListService , private taskService : TaskService, private route : ActivatedRoute, private router : Router){}

  ngOnInit(){
    // This observable is used to get the parameters form the url
    this.route.params.subscribe((params: Params)=>{
      if (params.list_id) {
        this.current_list_id = params.list_id;
        this.taskService.getListTasks(params.list_id).subscribe((tasks : any)=>{
          this.allListTask = tasks;   
          this.checkTaskComplete(this.allListTask);    
        });        
      }
    });

    this.listService.getAllList().subscribe((lists: any)=>{
      this.allLists = lists;    
    });
  }

  // this is the function which is used to complete and task's of the list
  toggleStepCompleted(task : any){
    this.taskService.completeListTask(task).subscribe(()=>{
      task.is_completed = !task.is_completed;

      const newState = this.allListTask.map((obj :any ) =>
        obj._id === task._id ? { ...obj, is_completed: task.is_completed } : obj);
        console.log(newState);
        
      this.checkTaskComplete(newState);
    });    
  }

  deleteListTask(currentTask : any,e:any){    
    e.stopPropagation();
    this.taskService.deleteListTask(currentTask).subscribe(()=>{
      e.target.closest('.task-menu-item').remove();
      this.removeTaskFromArray(this.allListTask , currentTask._id);       
    });    
  }

  deleteList(){
    this.listService.deleteList(this.current_list_id).subscribe((res)=>{
      this.router.navigate(['../'],{relativeTo:this.route});   
    });
  }

  removeTaskFromArray(arr : any , task_id: string) {
    const objWithIdIndex = arr.findIndex((obj:any) => obj._id === task_id);
    arr.splice(objWithIdIndex, 1);
    return arr;
  }

  checkTaskComplete(allListTask : any){
    this.is_all_complete = true;
    for (let index = 0; index < allListTask.length; index++) {            
      if(this.allListTask[index].is_completed !== true){        
        this.is_all_complete = false;
      }        
    }    
  }
  resetAll(){
    this.taskService.completeAllListTask(this.current_list_id,false).subscribe((res :any)=>{
      const newState = this.allListTask.map((obj :any ) =>
        obj._listId === this.current_list_id ? { ...obj, is_completed: false } : obj);
        this.is_all_complete = false;
        this.allListTask = newState;        
    });
  }

}
