import { Priority } from "./priority";
import {Status} from "./status"
export interface Task {
  id:string,
  TaskName:string,
  description:string,
  Priority:Priority,
  status:Status,
  dueDate:Date
}
