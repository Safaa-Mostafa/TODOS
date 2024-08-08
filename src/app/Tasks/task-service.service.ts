import { Injectable } from '@angular/core';
import { Task } from '../task';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
baseUrl:string="http://localhost:3000";
  constructor(private http: HttpClient) { }

addTask(task:Task):Observable<Task>{
  return this.http.post<Task>(`${this.baseUrl}/tasks`,task);
}
getTasks():Observable<Task[]>{
  return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
}
getTask(id:string):Observable<Task>{
  return this.http.get<Task>(`${this.baseUrl}/tasks/${id}`);
}
updateTask(obj:Task,id:string):Observable<Task>{
return this.http.patch<Task>(`${this.baseUrl}/tasks/${id}`,obj);
}
deleteTask(id:string):Observable<void>{
  return this.http.delete<void>(`${this.baseUrl}/tasks/${id}`);
}

}
