import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../service/project-service";
import {Project} from "../dto/project";
import {FormBuilder} from "@angular/forms";
import {UserStoryService} from "../service/userstory-service";
import {UserStory} from "../dto/user-story";
import {MatDialog} from "@angular/material";
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

  project: Project = Project.getBlankProject();
  currentSprint: Sprint = Sprint.getBlankSprint();
  sprints: Sprint[] = [];
  userStories: UserStory[] = [];
  projectUsers: User[] = [];
  isCardViewSelected: boolean = true;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userStoryService: UserStoryService,
              private userService: UserService,
              private projectService: ProjectService,
              private sprintService: SprintService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.project.id = this.route.snapshot.params['id'];

    this.projectService.getProjectBrief(this.project.id).subscribe((response) => {
      this.project = response
    });

    this.sprintService.getAllByProjectIdBrief(this.project.id).subscribe(
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

  onSprintChange(sprintId: number) {
    this.currentSprint = this.sprints.find((sprint) => sprint.id === sprintId);
    this.userStoryService.getAllUserStoriesByProjectIdAndSprintId(this.project.id, sprintId).subscribe(
      (response) => this.userStories = response,
      (error) => console.log(error));
  }

  onCardViewClick(){
    this.isCardViewSelected = true;
  }

  onSlimViewClick(){
    this.isCardViewSelected = false;
  }
}
