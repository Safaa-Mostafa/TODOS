import { Component, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Task } from '../../task';
import { Priority } from '../../priority';
import { Status } from './../../status';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskServiceService } from '../task-service.service';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
  ],
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
})
export class AllTasksComponent {
  dataSource: Task[] = [];
  no: number = 0;
  displayedColumns: string[] = [
    'no',
    'TaskName',
    'description',
    'Priority',
    'status',
    'dueDate',
    'actions',
  ];
  selection = new SelectionModel<Task>(true, []);

  constructor(
    private dialog: MatDialog,
    private TaskService: TaskServiceService,
    private location: Location
  ) {
    this.loadGrid();
  }
  public loadGrid(){

    this.TaskService.getTasks().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (err) => console.log(err),
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: Task): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.TaskName + 1
    }`;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach((row) => this.selection.select(row));
  }

  openDialog() {
    this.dialog.open(AddTaskComponent, {
      width: '50%',
      maxHeight: '100%'
    });
  }
  updateDialog(id: number) {
     this.dialog.open(UpdateTaskComponent, {
      width: '50%',
      maxHeight: '100%',
      data: { id: id,
       alltasks: this
       }
    });
  }

  deleteTask(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((confirmd: any) => {
      if (confirmd.isConfirmed) {
        console.log(confirmd);
        this.TaskService.deleteTask(id).subscribe({
          next: (data) => {
            Swal.fire(
              'Thank you...',
              'Your Task deleted successfully!',
              'success'
            );
            this.loadGrid()
                    },
          error: (err) =>
            Swal.fire('oops...', 'maybe something wrong!', 'error'),
        });
        Swal.fire('Poof! Your Task has been deleted!', 'success');
      } else {
        Swal.fire('Your Task is safe!');
      }
    });
  }
}
