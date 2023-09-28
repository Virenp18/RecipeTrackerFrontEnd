import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { UpdateTaskComponent } from './pages/update-task/update-task.component';

const routes: Routes = [
  {path : '' , redirectTo : '/lists', pathMatch: 'full'},
  {path : 'lists', component: TaskViewComponent},
  {path : 'newList' , component : NewListComponent},
  {path : 'lists/:list_id' , component : TaskViewComponent},
  {path : 'lists/:list_id/task' , component : NewTaskComponent},
  {path : 'lists/:list_id/task/:task_id' , component : UpdateTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
