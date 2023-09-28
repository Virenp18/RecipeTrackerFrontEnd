// this is the service file which is used for crud operation of list tasks with help of web service file injection.

import { Injectable } from '@angular/core';
import { WebRequestsService } from './web-requests.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequest : WebRequestsService) {}

  createNewTaskList(title : string , list_id : string){
    return this.webRequest.create(`list/${list_id}/tasks`, {title});  
  }

  getListTasks(list_id : string){
    return this.webRequest.read(`list/${list_id}/tasks`);
  }

  completeListTask(task:any){
    return this.webRequest.update(`list/${task._listId}/tasks/${task._id}`,{is_completed : !task.is_completed});
  }

  getOneListTask(list_id : string , task_id : string ){
    return this.webRequest.read(`list/${list_id}/tasks/${task_id}`);
  }

  updateListTask(currentTask: any, updatedTitle: string){
    return this.webRequest.update(`list/${currentTask.list_id}/tasks/${currentTask.task_id}`,{title: updatedTitle});
  }

  deleteListTask(task : any){
    return this.webRequest.delete(`list/${task._listId}/tasks/${task._id}`);
  }

  completeAllListTask(list_id : string,is_completed:boolean){
    return this.webRequest.update(`list/${list_id}/tasks`,{is_completed});
  }
}
