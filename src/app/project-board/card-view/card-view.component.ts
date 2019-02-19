import {Component, Input, OnInit} from '@angular/core';
import {AppConstants} from "../../util/app-constants";
import {Project} from "../../dto/project";
import {Sprint} from "../../dto/sprint";
import {UserStory} from "../../dto/user-story";
import {User} from "../../dto/user";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserStoryService} from "../../service/userstory-service";
import {UserService} from "../../service/user-service";
import {ProjectService} from "../../service/project-service";
import {SprintService} from "../../service/sprint-service";
import {MatDialog} from "@angular/material";
import {UserstoryDialogComponent} from "../../dialog/userstory-dialog/userstory-dialog.component";
import {Util} from "../../util/util";

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {

  public NEW = AppConstants.NEW;
  public IN_PROGRESS = AppConstants.IN_PROGRESS;
  public IN_REVIEW = AppConstants.IN_REVIEW;
  public DONE = AppConstants.DONE;

  @Input() project: Project = Project.getBlankProject();
  @Input() currentSprint: Sprint = Sprint.getBlankSprint();
  @Input() sprints: Sprint[] = [];
  @Input() userStories: UserStory[] = [];
  @Input() projectUsers: User[] = [];

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userStoryService: UserStoryService,
              private userService: UserService,
              private projectService: ProjectService,
              private springService: SprintService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  onAddUserStory(userStory: UserStory) {
    this.userStories.push(userStory);
  }

  onRemoveUserStory(userStoryId: number) {
    const indexOfUserStory = this.userStories.findIndex(item => item.id === userStoryId);
    this.userStories.splice(indexOfUserStory, 1);
  }

  onRemoveTask(taskId: number, userStoryId: number) {
    let userStory = this.userStories.find((item) => item.id === userStoryId);
    const indexOfTask = userStory.tasks.findIndex(item => item.id === taskId);
    userStory.tasks.splice(indexOfTask, 1);
  }

  onRemoveBug(bugId: number, userStoryId: number) {
    let userStory = this.userStories.find((item) => item.id === userStoryId);
    const indexOfBug = userStory.bugs.findIndex(item => item.id === bugId);
    userStory.bugs.splice(indexOfBug, 1);
  }

  onSprintChange(sprintId: number) {
    this.currentSprint = this.sprints.find((sprint) => sprint.id === sprintId);
    this.userStoryService.getAllUserStoriesByProjectIdAndSprintId(this.project.id, sprintId).subscribe(
      (response) => this.userStories = response,
      (error) => console.log(error));
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

    const allUsers = this.projectUsers;
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

          userStory.sprint = Sprint.getBlankSprint();
          userStory.sprint.id = this.currentSprint.id;

          userStory.tasks = [];
          userStory.bugs = [];

          console.log('On create new user story from project board component: ');
          this.userStoryService.createUserStory(userStory).subscribe(
            (response) => this.userStories.push(response),
            (error) => console.log(error));
        }
      });

  }

  isUserStoryListEmpty(): boolean {
    return Util.isNullOrUndefined(this.userStories) || this.userStories.length === 0;
  }


}
