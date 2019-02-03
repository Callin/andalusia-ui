import {Component, OnInit} from '@angular/core';
import {SprintService} from "../service/sprint-service";
import {ActivatedRoute} from "@angular/router";
import {Sprint} from "../dto/sprint";
import {ProjectService} from "../service/project-service";
import {Project} from "../dto/project";
import {Util} from "../util/util";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {AppConstants} from "../util/app-constants";
import {SprintDialogComponent} from "../dialog/sprint-dialog/sprint-dialog.component";

@Component({
  selector: 'app-project-backlog',
  templateUrl: './project-backlog.component.html',
  styleUrls: ['./project-backlog.component.css']
})
export class ProjectBacklogComponent implements OnInit {

  private sprints: Sprint[] = [];
  private projectId: number;
  private project: Project = Project.getBlankProject();

  constructor(private route: ActivatedRoute,
              private sprintService: SprintService,
              private projectService: ProjectService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog) {
  }
  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];

    this.sprintService.getAllByProjectId(this.projectId).subscribe(
      (response: Sprint[]) => this.sprints = response,
      (error) => console.log(error));

    this.projectService.getProject(this.projectId).subscribe(
      (response: Project) => this.project = response,
      (error) => console.log(error));
  }

  addNewSprint() {
      let sprintForm: FormGroup = this.formBuilder.group({
        'id': new FormControl(null),
        'number': new FormControl("", Validators.required),
        'startDate': new FormControl(""),
        'endDate': new FormControl(AppConstants.NEW),
      });


      let matDialogConfig = {
        data: {
          sprintForm
        }
      };

      const dialogRef = this.dialog.open(SprintDialogComponent, matDialogConfig);

      dialogRef.afterClosed()
        .subscribe(result => {
          if (result != null) {
            let sprint: Sprint = Sprint.getBlankSprint();
            sprint.number = result.sprintForm.controls['number'].value;
            sprint.startDate = result.sprintForm.controls['startDate'].value;
            sprint.endDate = result.sprintForm.controls['endDate'].value;

            sprint.project = Project.getBlankProject();
            sprint.project.id = this.projectId;

            this.sprintService.createSprint(sprint).subscribe(
              (response) => this.project.sprints.push(response),
              (error) => console.log(error));
          }
        });
  }

  isSprintListEmpty(): boolean {
    return Util.isNullOrUndefined(this.sprints) || this.sprints.length === 0;
  }

}
