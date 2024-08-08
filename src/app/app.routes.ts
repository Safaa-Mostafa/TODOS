import { Routes } from '@angular/router';
import { AllTasksComponent } from './Tasks/all-tasks/all-tasks.component';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './Tasks/add-task/add-task.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [
  {path:"home",component:AllTasksComponent},
  { path: "", redirectTo: '/home', pathMatch: 'full'},
  {path:"**",component:NotFoundComponent},
];
