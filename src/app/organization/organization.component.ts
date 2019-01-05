import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";
import {Project} from "../dto/project";
import {User} from "../dto/user";
import {UserDialogComponent} from "../dialog/user-dialog/user-dialog.component";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RemoveDialogComponent} from "../dialog/remove-dialog/remove-dialog.component";
import {Organization} from "../dto/organization";
import {MatDialog} from "@angular/material";
import {OrganizationService} from "../service/organization-service";
import {ProjectService} from "../service/project-service";
import {UserService} from "../service/user-service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  projectList: Project[] = [];
  users: User[] = [];
  organization: Organization;

  REMOVE_PROJECT: string = 'project';
  REMOVE_USER: string = 'user';

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private organizationService: OrganizationService,
              private projectService: ProjectService,
              private userService: UserService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // this.projectService.getAllProjectsByOrganizationId(this.route.snapshot.params['id']).subscribe(
    //   (projects) => this.projectList = projects,
    //   (error) => console.log(error));
    //
    // this.userService.getAllUsersByOrganizationId(this.route.snapshot.params['id']).subscribe(
    //   (organizationUsers) => this.organizationUsers = organizationUsers,
    //   (error) => console.log(error));
    //
    console.log("loooooooooool");
    this.organizationService.getOrganization(this.route.snapshot.params['id']).subscribe(
      (organization) => this.organization = organization,
      (error) => console.log(error));
  }




  openEditProjectUsersDialog(project: Project) {
    // // show predefined data
    // let userFormControlGroup: FormGroup = this.formBuilder.group({
    //   'userFormArray': new FormArray([])
    // });
    // const userFormArray = userFormControlGroup.get('userFormArray') as FormArray;
    // let organizationUsers = this.organizationUsers;
    // organizationUsers.forEach(user => userFormArray.push(new FormControl(this.isPartOfTheProject(user, project))));
    //
    // const dialogRef = this.dialog.open(ProjectUsersDialogComponent, {
    //   width: '25%',
    //   height: '70%',
    //   data: {
    //     userFormControlGroup,
    //     organizationUsers,
    //     project
    //   }
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('Dialog closed');
    //   if (result != null) {
    //     project.organizationUsers = organizationUsers.filter((user, i) => userFormControlGroup.value.userFormArray[i] === true);
    //     project.organization = this.organization;
    //     project.organizationUsers.forEach(user => user.organization = this.organization);
    //
    //     this.projectService.updateProject(project).subscribe(
    //       (response) => this.toastr.success(project.name + ' was updated', 'Project update'),
    //       (error) => {
    //         this.toastr.error(name + ' was not updated', 'Project update failed');
    //         console.log(error);
    //       });
    //   }
    // });
  }

  isPartOfTheProject(user: User, project: Project): boolean {
    if (project !== null && project.users !== null) {
      const userIndex = project.users.findIndex(projectUser => projectUser.id === user.id);
      return userIndex !== -1;
    }

    return false;
  }

  isNull(item: any) {
    return isNullOrUndefined(item)
  }

}
