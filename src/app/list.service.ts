// this is the service file which is used for crud operation of lists sidebar with help of web service file injection.
import { Injectable } from '@angular/core';
import { WebRequestsService } from './web-requests.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(private webService : WebRequestsService) { 

  }
  createNewList(title : String){
    return this.webService.create('lists',{ title });
  }
  getAllList(){
    return this.webService.read('lists');
  }
  deleteList(list_id : string){
    return this.webService.delete(`lists/${list_id}`);
  }
}
