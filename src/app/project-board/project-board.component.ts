import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../service/project-service";
import {Project} from "../dto/project";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppConstants} from "../util/app-constants";
import {UserStoryService} from "../service/userstory-service";
import {UserStory} from "../dto/user-story";
import {UserstoryDialogComponent} from "../dialog/userstory-dialog/userstory-dialog.component";
import {MatDialog} from "@angular/material";
import {Util} from "../util/util";
import {SprintService} from "../service/sprint-service";
import {Sprint} from "../dto/sprint";
import {UserService} from "../service/user-service";
import {User} from "../dto/user";

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.css']
})
export class ProjectBoardComponent implements OnInit {
  public NEW = AppConstants.NEW;
  public IN_PROGRESS = AppConstants.IN_PROGRESS;
  public IN_REVIEW = AppConstants.IN_REVIEW;
  public DONE = AppConstants.DONE;

  project: Project = Project.getBlankProject();
  currentSprint: Sprint = Sprint.getBlankSprint();
  sprints: Sprint[] = [];
  userStories: UserStory[] = [];
  projectUsers: User[] = [];

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userStoryService: UserStoryService,
              private userService: UserService,
              private projectService: ProjectService,
              private springService: SprintService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.project.id = this.route.snapshot.params['id'];

    this.projectService.getProjectBrief(this.project.id).subscribe((response) => {
      this.project = response
    });

    this.springService.getAllByProjectIdBrief(this.project.id).subscribe(
      (response: Sprint[]) => {
        if (response) {
          this.sprints = response;
          let now: Date = new Date();
          this.currentSprint = response.find((sprint: Sprint) => {
            const startDate = new Date(sprint.startDate);
            const endDate = new Date(sprint.endDate);
            return startDate.getTime() <= now.getTime() && endDate.getTime() >= now.getTime();
          });
        }
      },
      (error) => console.log(error));

    this.userStoryService.getAllUserStoriesByProjectIdAndCurrentSprint(this.project.id).subscribe(
      (response) => this.userStories = response,
      (error) => console.log(error));

    this.userService.getAllUsersByProjectId(this.project.id).subscribe(
      (response) => this.projectUsers = response,
      (error) => console.log(error));
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
