import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../service/project-service";
import {Project} from "../dto/project";
import {ActivatedRoute} from "@angular/router";
import {LocalStorageService} from "../service/localstorage-service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  projects: Project[] = [];

  constructor(private route: ActivatedRoute,
              private localStorage: LocalStorageService,
              private projectService: ProjectService) { }

  ngOnInit() {
    let authorization = this.localStorage.get('userId');
    this.projectService.getAllProjectsByUserId(4).subscribe( // to be changed
      (projects) => this.projects = projects,
      (error) => console.log(error));
    }

}
