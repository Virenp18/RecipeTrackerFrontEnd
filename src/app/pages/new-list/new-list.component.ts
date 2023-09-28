import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from 'src/app/list.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent {
  newRecipeTitle : string;
  constructor(private listService : ListService, private router: Router){

  }

  createNewList(title : string){
    this.listService.createNewList(title).subscribe((response : any)=>{
      // redirect the response
      this.router.navigate(['/lists',response._id]);       
    });
  }
}
