import {Component, Input, OnInit} from '@angular/core';
import {UserStory} from "../../dto/user-story";
import {User} from "../../dto/user";
import {AppConstants} from "../../util/app-constants";
import {UserStoryService} from "../../service/userstory-service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserstoryDialogComponent} from "../../dialog/userstory-dialog/userstory-dialog.component";
import {Project} from "../../dto/project";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css']
})
export class UserStoryComponent implements OnInit {

  @Input() userStory: UserStory = UserStory.getBlankUserStory();
  @Input() project: Project;

  public statusList = AppConstants.STATUS_LIST;

  constructor(private userStoryService: UserStoryService,
              public formBuilder: FormBuilder,
              public dialog: MatDialog,
              private toastService: ToastrService) {
  }

  ngOnInit() {
  }

  openExistingUserStoryDialog(userStory: UserStory) {

  }

  addNewUserStory() {
    let boardItemForm: FormGroup = this.formBuilder.group({
      'id': new FormControl(null),
      'name': new FormControl("", Validators.required),
      'description': new FormControl(""),
      'status': new FormControl(AppConstants.NEW),
      'priority': new FormControl(2),
      'estimation': new FormControl(2),
      'user': new FormControl(null, Validators.required)
    });

    const allUsers = this.project.users;
    const statusList: string[] = AppConstants.STATUS_LIST;
    const isNew = true;

    let matDialogConfig = {
      data: {
        boardItemForm,
        allUsers,
        statusList,
        isNew
      }
    };

    const dialogRef = this.dialog.open(UserstoryDialogComponent, matDialogConfig);

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result != null) {
          let userStory: UserStory = UserStory.getBlankUserStory();
          userStory.name = result.boardItemForm.controls['name'].value;
          userStory.description = result.boardItemForm.controls['description'].value;
          userStory.status = result.boardItemForm.controls['status'].value;
          userStory.priority = result.boardItemForm.controls['priority'].value;
          userStory.estimation = result.boardItemForm.controls['estimation'].value;

          userStory.user = result.boardItemForm.controls['user'].value;

          userStory.project = Project.getBlankProject();
          userStory.project.id = this.project.id;

          console.log('On create user story: ');
          this.userStoryService.createUserStory(userStory).subscribe(
            (response) => this.project.userStories.push(response),
            (error) => console.log(error));
        }
      });

  }

  editUserStory() {
    let boardItemForm: FormGroup = this.formBuilder.group({
      'id': new FormControl(this.userStory.id),
      'name': new FormControl(this.userStory.name, Validators.required),
      'description': new FormControl(this.userStory.description),
      'status': new FormControl(this.userStory.status),
      'priority': new FormControl(this.userStory.priority),
      'estimation': new FormControl(this.userStory.estimation),
      'user': new FormControl(this.userStory.user, Validators.required)
    });

    const allUsers = this.project.users;
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
          this.userStory.name = result.boardItemForm.controls['name'].value;
          this.userStory.description = result.boardItemForm.controls['description'].value;
          this.userStory.status = result.boardItemForm.controls['status'].value;
          this.userStory.priority = result.boardItemForm.controls['priority'].value;
          this.userStory.estimation = result.boardItemForm.controls['estimation'].value;

          this.userStory.user = User.getBlankUser();
          this.userStory.user = result.boardItemForm.controls['user'].value;

          this.userStory.project = Project.getBlankProject();
          this.userStory.project.id = this.project.id;

          console.log('On create user story: ');
          this.userStoryService.updateUserStory(this.userStory).subscribe(
            () => {
              this.toastService.info('User story has been updated ', 'User story update');
              boardItemForm.controls['user'].setValue(this.userStory.user);
            },
            () => this.toastService.error('User story has not been updated ', 'User story update'))
        }
      });

  }

  onUserStoryStatusChange() {
    this.userStory.project = Project.getBlankProject();
    this.userStory.project.id = this.project.id;
    this.userStoryService.updateUserStory(this.userStory).subscribe(
        (response) => this.toastService.info('User story has been updated ', 'User story update'),
        (error) => this.toastService.error('User story has not been updated ', 'User story update'))
  }

  getUserName(user: User): string {
    return (user === null || user === undefined) ? "none" : user.name;
  }
}
