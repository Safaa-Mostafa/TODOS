import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
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
import Swal from 'sweetalert2';
import { Task } from '../../task';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { AllTasksComponent } from '../all-tasks/all-tasks.component';

@Component({
  selector: 'app-update-task',
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
  AllTasksComponent  ],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css',
})
export class UpdateTaskComponent {
 alltasks!:AllTasksComponent;
  taskId!: string;
  task!: Task;
  taskForm!: FormGroup;
  priorityOptions: Priority[] = [Priority.Low, Priority.Medium, Priority.High];
  statusOptions: Status[] = [
    Status.completed,
    Status.inprogress,
    Status.pending,
  ];
  public taskData!: Task;
  routerSubscription!:Subscription;
  constructor(
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<UpdateTaskComponent>,
    private TaskServices: TaskServiceService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string,alltasks:AllTasksComponent }
  ) {
    this.taskId = data.id;
this.alltasks = data.alltasks;
    this.routerSubscription = this.TaskServices.getTask(this.taskId).subscribe({
      next: (task: Task) => {
        this.taskData = task;
        console.log(this.taskData);
      },
      error: (err) => Swal.fire('something went wrong'),
    });
  }

  ngOnInit(): void {
  this.taskForm = this.formBuilder.group({
    id: [this.taskId],
    TaskName: ['', Validators.required],
    description: ['', Validators.required],
    Priority: ['', Validators.required],
    status: ['', Validators.required],
    dueDate: ['', Validators.required],
  });
    this.routerSubscription = this.TaskServices.getTask(this.taskId).subscribe({
      next: (task: Task) => {
        this.taskData = task;
      },
      error: (err) => Swal.fire('Something went wrong'),
    })
  }

  onSubmit() {
let self = this;

    if (this.taskForm.valid) {
      this.TaskServices.updateTask(this.taskForm.value, this.taskId).subscribe({
        next: () => {
          Swal.fire('Thank you...', 'Your task updated successfully!', 'success');
          self.dialog.close();
          self.alltasks.loadGrid();
        },
        error:(err)=>{
          Swal.fire(err.message, 'error');
        }
      });
    }else{
      Swal.fire('Please fill all required data', 'error');


    }
  }
  onCancel() {
    this.dialog.close();
  }
  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
