import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userStoryService: UserStoryService,
              private projectService: ProjectService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.projectService.getProject(this.route.snapshot.params['id']).subscribe( // to be changed
      (project) => this.project = project,
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

  isUserStoryListEmpty(): boolean {
    if (!Util.isNullOrUndefined(this.project)) {
      return Util.isNullOrUndefined(this.project.userStories) || this.project.userStories.length === 0;
    }

    return false;
  }

}
