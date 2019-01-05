import { Component, OnInit } from '@angular/core';
import {RemoveDialogComponent} from "../../dialog/remove-dialog/remove-dialog.component";
import {Project} from "../../dto/project";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../dto/user";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material";
import {OrganizationService} from "../../service/organization-service";
import {ProjectService} from "../../service/project-service";
import {UserService} from "../../service/user-service";
import {ToastrService} from "ngx-toastr";
import {Organization} from "../../dto/organization";
import {ProjectDialogComponent} from "../../dialog/project-dialog/project-dialog.component";

@Component({
  selector: 'app-project-tab',
  templateUrl: './projects-tab.component.html',
  styleUrls: ['./projects-tab.component.css']
})
export class ProjectsTabComponent implements OnInit {
  projectList: Project[] = [];
  organizationUsers: User[] = [];
  organization: Organization;

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private organizationService: OrganizationService,
              private projectService: ProjectService,
              private userService: UserService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.projectService.getAllProjectsByOrganizationId(this.route.snapshot.params['id']).subscribe(
      (projects) => this.projectList = projects,
      (error) => console.log(error));

    this.userService.getAllUsersByOrganizationId(this.route.snapshot.params['id']).subscribe(
      (users) => this.organizationUsers = users,
      (error) => console.log(error));
    //
    this.organizationService.getOrganization(this.route.snapshot.params['id']).subscribe(
      (organization) => this.organization = organization,
      (error) => console.log(error));
  }

  openNewProjectDialog() {
    // show predefined data

    let projectForm: FormGroup = this.formBuilder.group({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null),
      'users': new FormControl()
    });

    const isNew = true;
    const orgUsers: User[] = this.organizationUsers;
    let projectUsers: User[] = [];
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '60%',
      height: '40%',
      minHeight: 350, // assumes px
      data: {
        projectForm,
        isNew,
        organizationUsers: orgUsers,
        projectUsers
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      if (result != null) {
        let project: Project = Project.getBlankProject();
        project.name = result.projectForm.controls['name'].value;
        project.description = result.projectForm.controls['description'].value;
        project.users = result.projectUsers;

        project.organization = this.organization;

        this.projectService.createProject(project).subscribe(
          (response) => {
            this.toastr.success(project.name + ' was created', 'Project add');
            this.projectList.push(response);
          },
          (error) => {
            this.toastr.error('Project was not created', 'Project add failed');
            console.log(error);
          });
      }
    });
  }

  openEditProjectDialog(project: Project) {
    // show predefined data
    let projectForm: FormGroup = this.formBuilder.group({
      'name': new FormControl(project.name, Validators.required),
      'description': new FormControl(project.description, null)
    });

    // const dialogRef = this.dialog.open(ProjectDialogComponent, {
    //   minWidth: '60%',
    //   minHeight: '40%',
    //   data: {
    //     projectForm,
    //     allTheUsers,
    //     projectUsers
    //   }
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('Dialog closed');
    //   if (result != null) {
    //     project.name = result.projectForm.controls['name'].value;
    //     project.description = result.projectForm.controls['description'].value;
    //     project.organizationUsers = result.projectUsers;
    //
    //     project.organization = this.organization;
    //
    //     project.organizationUsers.forEach(user => user.organization = this.organization);
    //
    //     this.projectService.updateProject(project).subscribe(
    //       (response) => this.toastr.success(project.name + ' was updated', 'Project update'),
    //       (error) => {
    //         this.toastr.error(project.name + ' was not updated', 'Project update failed');
    //         console.log(error);
    //       });
    //   }
    // });
  }

  openRemoveProjectDialog(id: number, name: string) {
    // show predefined data

    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '30%',
      height: '20%',
      minHeight: 170, // assumes px
      data: {
        name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      if (result != null) {
        this.projectService.deleteProject(id).subscribe(
          (response) => {
            if (response == null) {
              const indexOfProject = this.projectList.findIndex(project => project.id === id);
              this.projectList.splice(indexOfProject, 1);
              this.toastr.success(name + ' was removed', 'Project removed');
            }
          },
          (error) => {
            this.toastr.error(name + ' was not removed', 'Project removal failed');
            console.log(error);
          });
      }
    });
  }

}
