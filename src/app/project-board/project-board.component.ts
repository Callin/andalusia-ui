import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../service/project-service";
import {Project} from "../dto/project";

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.css']
})
export class ProjectBoardComponent implements OnInit {

  project: Project = Project.getBlankProject();

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProject(this.route.snapshot.params['id']).subscribe( // to be changed
      (project) => this.project = project,
      (error) => console.log(error));
  }

  openNewUserStoryDialog() {

  }

}
