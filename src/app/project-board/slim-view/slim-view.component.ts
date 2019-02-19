import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../dto/project";
import {Sprint} from "../../dto/sprint";
import {UserStory} from "../../dto/user-story";
import {User} from "../../dto/user";
import {MatDialog, MatTableDataSource} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppConstants} from "../../util/app-constants";
import {UserstoryDialogComponent} from "../../dialog/userstory-dialog/userstory-dialog.component";
import {UserStoryService} from "../../service/userstory-service";
import {TaskService} from "../../service/task-service";
import {BugService} from "../../service/bug-service";
import {ToastrService} from "ngx-toastr";
import {TaskDialogComponent} from "../../dialog/task-dialog/task-dialog.component";
import {Task} from "../../dto/task";
import {TasksDialogComponent} from "./tasks-dialog/tasks-dialog.component";
import {BugsDialogComponent} from "./bugs-dialog/bugs-dialog.component";

@Component({
  selector: 'app-slim-view',
  templateUrl: './slim-view.component.html',
  styleUrls: ['./slim-view.component.css']
})
export class SlimViewComponent implements OnInit {
  @Input() project: Project = Project.getBlankProject();
  @Input() currentSprint: Sprint = Sprint.getBlankSprint();
  @Input() sprints: Sprint[] = [];
  @Input() userStories: UserStory[] = [];
  @Input() projectUsers: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'priority', 'estimation', 'user'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(private userStoryService: UserStoryService,
              private taskService: TaskService,
              private bugService: BugService,
              public formBuilder: FormBuilder,
              public dialog: MatDialog,
              private toastService: ToastrService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.userStories);
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUserName(user: User): string {
    return (user === null || user === undefined) ? "none" : user.name;
  }

  openUserStoryDialog(item: UserStory){

    let boardItemForm: FormGroup = this.formBuilder.group({
      'id': new FormControl(item.id),
      'name': new FormControl(item.name, Validators.required),
      'description': new FormControl(item.description),
      'status': new FormControl(item.status),
      'priority': new FormControl(item.priority),
      'estimation': new FormControl(item.estimation),
      'user': new FormControl(item.user, Validators.required)
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

    const dialogRef = this.dialog.open(UserstoryDialogComponent, matDialogConfig);

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result != null) {
          item.name = result.boardItemForm.controls['name'].value;
          item.description = result.boardItemForm.controls['description'].value;
          item.status = result.boardItemForm.controls['status'].value;
          item.priority = result.boardItemForm.controls['priority'].value;
          item.estimation = result.boardItemForm.controls['estimation'].value;

          item.user = User.getBlankUser();
          item.user = result.boardItemForm.controls['user'].value;

          item.project = Project.getBlankProject();
          item.project.id = this.project.id;

          item.sprint = Sprint.getBlankSprint();
          item.sprint.id = this.currentSprint.id;

          this.userStoryService.updateUserStory(item).subscribe(
            () => {
              this.toastService.success('User story has been updated ', 'User story update');
              boardItemForm.controls['user'].setValue(item.user);
            },
            () => this.toastService.error('User story has not been updated ', 'User story update'))
        }
      });

  }

  openTasksDialog(userStory: UserStory) {
    let datasource = userStory.tasks;
    const projectUsers = this.projectUsers;
    const userStoryId = userStory.id;

    let matDialogConfig = {
      data: {
        datasource,
        projectUsers,
        userStoryId
      }
    };

    const dialogRef = this.dialog.open(TasksDialogComponent, matDialogConfig);

    dialogRef.afterClosed().subscribe();

  }

  openBugsDialog(userStory: UserStory) {
    let datasource = userStory.bugs;
    const projectUsers = this.projectUsers;
    const userStoryId = userStory.id;

    let matDialogConfig = {
      data: {
        datasource,
        projectUsers,
        userStoryId
      }
    };

    const dialogRef = this.dialog.open(BugsDialogComponent, matDialogConfig);

    dialogRef.afterClosed().subscribe();

  }

}
