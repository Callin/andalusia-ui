import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../dto/task";
import {User} from "../../dto/user";
import {AppConstants} from "../../util/app-constants";
import {TaskService} from "../../service/task-service";
import {ToastrService} from "ngx-toastr";
import {UserStory} from "../../dto/user-story";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {TaskDialogComponent} from "../../dialog/task-dialog/task-dialog.component";
import {Bug} from "../../dto/bug";
import {RemoveDialogComponent} from "../../dialog/remove-dialog/remove-dialog.component";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task = Task.getBlankTask();
  @Input() userStory: UserStory = UserStory.getBlankUserStory();
  @Input() projectUsers: User[] = [];
  public statusList = AppConstants.STATUS_LIST;

  constructor(private taskService: TaskService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private toastService: ToastrService) { }

  ngOnInit() {
  }

  onStatusChange() {
    this.task.userStory = UserStory.getBlankUserStory();
    this.task.userStory.id = this.userStory.id;
    this.taskService.updateTask(this.task).subscribe(
      () => this.toastService.info('Task has been updated ', 'Task update'),
      () => this.toastService.error('Task has not been updated ', 'Task update'))
  }

  getUserName(user: User): string {
    return (user === null || user === undefined) ? "none" : user.name;
  }

  editTask() {
    let boardItemForm: FormGroup = this.formBuilder.group({
      'id': new FormControl(this.task.id),
      'name': new FormControl(this.task.name, Validators.required),
      'description': new FormControl(this.task.description),
      'status': new FormControl(this.task.status),
      'priority': new FormControl(this.task.priority),
      'estimation': new FormControl(this.task.estimation),
      'user': new FormControl(this.task.user, Validators.required)
    });

    const allUsers = this.projectUsers;
    const statusList: string[] = AppConstants.STATUS_LIST;

    let matDialogConfig = {
      data: {
        boardItemForm,
        allUsers,
        statusList
      }
    };

    const dialogRef = this.dialog.open(TaskDialogComponent, matDialogConfig);

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result != null) {
          this.task.name = result.boardItemForm.controls['name'].value;
          this.task.description = result.boardItemForm.controls['description'].value;
          this.task.status = result.boardItemForm.controls['status'].value;
          this.task.priority = result.boardItemForm.controls['priority'].value;
          this.task.estimation = result.boardItemForm.controls['estimation'].value;

          this.task.user = User.getBlankUser();
          this.task.user = result.boardItemForm.controls['user'].value;

          this.task.userStory= UserStory.getBlankUserStory();
          this.task.userStory.id = this.userStory.id;

          this.taskService.updateTask(this.task).subscribe(
            () => {
              this.toastService.info('Task has been updated ', 'Task update');
              boardItemForm.controls['user'].setValue(this.task.user);
            },
            () => this.toastService.error('Task has not been updated ', 'Task update'))
        }
      });

  }


  openRemoveTaskDialog() {
    const type = 'task';
    const name = this.task.name;
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '30%',
      height: '20%',
      minHeight: 170, // assumes px
      data: {
        name,
        type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      if (result != null) {
        this.taskService.deleteTask(this.task.id)
          .subscribe((response) => {
              if (response == null) {
                const indexOfTask = this.userStory.tasks.findIndex(item => item.id === this.task.id);
                this.userStory.tasks.splice(indexOfTask, 1);
                this.toastService.success(this.task.name + ' task was removed', 'Task removed');
              }
            },
            (error) => {
              this.toastService.error(this.task.name + ' was not removed', 'Task removal failed');
              console.log(error);
            });
      }
    });
  }


}
