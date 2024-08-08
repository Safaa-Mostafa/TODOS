import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { Priority } from '../../priority';
import { Status } from '../../status';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskServiceService } from '../task-service.service';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../task';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    MatGridListModule,
    MatNativeDateModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],

  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  task!: Task;
  taskForm!: FormGroup;
  priorityOptions: Priority[] = [Priority.Low, Priority.Medium, Priority.High];
  statusOptions: Status[] = [
    Status.completed,
    Status.inprogress,
    Status.pending,
  ];
  constructor(
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<AddTaskComponent>,
    private TaskServices: TaskServiceService
  ) {
    this.taskForm = this.formBuilder.group({
      TaskName: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      Priority: ['', Validators.required],
      status: ['', Validators.required],
    });
  }
  onSubmit() {
    if(this.taskForm){
    this.task = {
      id: uuidv4(),
      TaskName: this.taskForm.controls['TaskName'].value,
      description: this.taskForm.controls['description'].value,
      Priority: this.taskForm.controls['Priority'].value,
      status: this.taskForm.controls['status'].value,
      dueDate: this.taskForm.controls['dueDate'].value,
    };
    console.log(this.task);
    this.TaskServices.addTask(this.task).subscribe({
      next: (data) => {
        Swal.fire('Thank you...', 'Your Task Added successfully!', 'success');
        window.location.reload();
      },
      error: (err) => console.log(err),
    });
    this.dialog.close();
  }else{
    Swal.fire('Invalid', 'error');

  }
  }
  onCancel() {
    this.dialog.close();
  }
}
