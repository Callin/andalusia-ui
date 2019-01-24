import {Component, Input, OnInit} from '@angular/core';
import {RemoveDialogComponent} from "../../dialog/remove-dialog/remove-dialog.component";
import {Project} from "../../dto/project";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../dto/user";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material";
import {OrganizationService} from "../../service/organization-service";
import {ProjectService} from "../../service/project-service";
import {UserService} from "../../service/user-service";
import {ToastrService} from "ngx-toastr";
import {Organization} from "../../dto/organization";
import {ProjectDialogComponent} from "../../dialog/project-dialog/project-dialog.component";
import {ProjectUsersDialogComponent} from "../../dialog/project-users-dialog/project-users-dialog.component";

@Component({
  selector: 'app-project-tab',
  templateUrl: './projects-tab.component.html',
  styleUrls: ['./projects-tab.component.css']
})
export class ProjectsTabComponent implements OnInit {
  @Input() organization: Organization;

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private organizationService: OrganizationService,
              private projectService: ProjectService,
              private userService: UserService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

  openNewProjectDialog() {
    // show predefined data

    let projectForm: FormGroup = this.formBuilder.group({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null),
      'users': new FormControl()
    });

    const organizationUsers: User[] = this.organization.users;
    let projectUsers: User[] = [];
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '60%',
      height: '40%',
      minHeight: 350, // assumes px
      data: {
        projectForm,
        organizationUsers,
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
            this.organization.projects.push(response);
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
      'description': new FormControl(project.description, null),
      'users': new FormControl(project.users)
    });

    const organizationUsers: User[] = this.organization.users;
    let projectUsers: User[] = project.users;
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      minWidth: '60%',
      minHeight: '40%',
      data: {
        projectForm,
        organizationUsers,
        projectUsers
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      if (result != null) {
        project.name = result.projectForm.controls['name'].value;
        project.description = result.projectForm.controls['description'].value;
        project.users = result.projectUsers;
        project.organization = Organization.getOrganization(this.organization.id);

        project.users.forEach(user => user.organization = Organization.getOrganization(this.organization.id));

        this.projectService.updateProject(project).subscribe(
          (response) => this.toastr.success(project.name + ' was updated', 'Project update'),
          (error) => {
            this.toastr.error(project.name + ' was not updated', 'Project update failed');
            console.log(error);
          });
      }
    });
  }

  openEditProjectUsersDialog(project: Project) {
    // show predefined data
    let userFormControlGroup: FormGroup = this.formBuilder.group({
      'userFormArray': new FormArray([])
    });
    const userFormArray = userFormControlGroup.get('userFormArray') as FormArray;
    let users = this.organization.users;
    users.forEach(user => userFormArray.push(new FormControl(this.isPartOfTheProject(user, project))));

    const dialogRef = this.dialog.open(ProjectUsersDialogComponent, {
      width: '25%',
      height: '70%',
      data: {
        userFormControlGroup,
        users,
        project
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      if (result != null) {
        project.users = users.filter((user, i) => userFormControlGroup.value.userFormArray[i] === true);
        project.organization = this.organization;
        project.users.forEach(user => user.organization = this.organization);

        this.projectService.updateProject(project).subscribe(
          (response) => this.toastr.success(project.name + ' was updated', 'Project update'),
          (error) => {
            this.toastr.error(name + ' was not updated', 'Project update failed');
            console.log(error);
          });
      }
    });
  }

  isPartOfTheProject(user: User, project: Project): boolean {
    if (project !== null && project.users !== null) {
      const userIndex = project.users.findIndex(projectUser => projectUser.id === user.id);
      return userIndex !== -1;
    }

    return false;
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
              const indexOfProject = this.organization.projects.findIndex(project => project.id === id);
              this.organization.projects.splice(indexOfProject, 1);
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
