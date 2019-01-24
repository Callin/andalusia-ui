import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../dto/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserDialogComponent} from "../../dialog/user-dialog/user-dialog.component";
import {RemoveDialogComponent} from "../../dialog/remove-dialog/remove-dialog.component";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material";
import {OrganizationService} from "../../service/organization-service";
import {ProjectService} from "../../service/project-service";
import {UserService} from "../../service/user-service";
import {ToastrService} from "ngx-toastr";
import {Organization} from "../../dto/organization";

@Component({
  selector: 'app-users-tab',
  templateUrl: './users-tab.component.html',
  styleUrls: ['./users-tab.component.css']
})
export class UsersTabComponent implements OnInit {
  users: User[] = [];
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
     this.users = this.organization.users;
  }

  openNewUserDialog() {
    const userFormGroup: FormGroup = this.formBuilder.group({
      'id': new FormControl(null),
      'name': new FormControl('', Validators.required),
      'email': new FormControl(null, Validators.required),
      'organization': new FormControl(this.organization, Validators.required)
    });

    let organizationList = [this.organization];
    const dialogRef = this.dialog.open(UserDialogComponent, {
      minWidth: '60%',
      minHeight: '50%',
      data: {
        userFormGroup,
        organizationList
      }
    });


    dialogRef.afterClosed()
      .subscribe(result => {
        if (result != null) {
          const user: User = User.getBlankUser();
          user.name = result.userFormGroup.controls['name'].value;
          user.email = result.userFormGroup.controls['email'].value;
          user.organization = result.userFormGroup.controls['organization'].value;

          this.userService.createUser(user).subscribe(
            (response) => {
              this.users.push(response);
              this.toastr.success(user.name + ' was added', 'Add user');
            },
            (error) => {
              this.toastr.error(user.name + ' was not updated', 'User add failed');
              console.log(error);
            });
        }
      });
  }

  openEditUserDialog(user: User) {

    const userFormGroup: FormGroup = this.formBuilder.group({
      'id': new FormControl(user.id),
      'name': new FormControl(user.name, Validators.required),
      'email': new FormControl(user.email),
      'organization': new FormControl(this.organization, Validators.required)
    });

    const organizationList = [this.organization];
    const dialogRef = this.dialog.open(UserDialogComponent, {
      minWidth: '60%',
      minHeight: '50%',
      data: {
        userFormGroup,
        organizationList
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result != null) {
          user.id = result.userFormGroup.controls['id'].value;
          user.name = result.userFormGroup.controls['name'].value;
          user.email = result.userFormGroup.controls['email'].value;
          user.organization = result.userFormGroup.controls['organization'].value;

          this.userService.updateUser(user).subscribe(
            () => this.toastr.success(user.name + ' was updated', 'User update'),
            (error) => {
              this.toastr.error(user.name + ' was not updated', 'User update failed');
              console.log(error);
            });
        }
      });
  }

  openRemoveUserDialog(id: number, name: string) {
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
        this.userService.deleteUser(id).subscribe(
          (response) => {
            if (response == null) {
              const indexOfUser = this.users.findIndex(user => user.id === id);
              this.users.splice(indexOfUser, 1);
              this.toastr.success(name + ' was removed', 'User removed');
            }
          },
          (error) => {
            this.toastr.error(name + ' was not removed', 'User removal failed');
            console.log(error);
          });
      }
    });
  }
}
