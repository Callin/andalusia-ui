import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {RemoveDialogComponent} from "../../dialog/remove-dialog/remove-dialog.component";
import {User} from "../../dto/user";
import {UserService} from "../../service/user-service";
import {UserDialogComponent} from "../../dialog/user-dialog/user-dialog.component";
import {Organization} from "../../dto/organization";
import {OrganizationService} from "../../service/organization-service";

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css']
})
export class UserTabComponent implements OnInit {

  userList: User[] = [];
  organizationList: Organization[] = [];

  constructor(private dialog: MatDialog,
              private userService: UserService,
              private organizationService: OrganizationService,
              public formBuilder: FormBuilder,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.organizationService.getAllOrganizations().subscribe(
      (organizations) => this.organizationList = organizations,
      (error) => console.log(error));

    this.userService.getAllUsers().subscribe(
      (users) => this.userList = users,
      (error) => console.log(error));
  }

  openNewUserDialog() {
    const userFormGroup: FormGroup = this.formBuilder.group({
      'id': new FormControl(null),
      'name': new FormControl('', Validators.required),
      'email': new FormControl(null, Validators.required),
      'organization': new FormControl(null, Validators.required)
    });

    let organizationList = this.organizationList;
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
              this.userList.push(response);
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
      'organization': new FormControl(user.organization)
    });

    const organizationList = this.organizationList;
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

  openRemoveUserDialog(user: User) {
    const type = 'user';
    const name = user.name;
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '30%',
      height: '20%',
      minHeight: 170, // assumes px
      data: {
        name,
        type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      if (result != null) {
        this.userService.deleteUser(user.id)
          .subscribe((response) => {
              if (response == null) {
                const indexOfTask = this.userList.findIndex(item => item.id === user.id);
                this.userList.splice(indexOfTask, 1);
                this.toastr.success(user.name + ' was removed', 'User removed');
              }
            },
            (error) => {
              this.toastr.error(user.name + ' was not removed', 'User removal failed');
              console.log(error);
            });
      }
    });
  }
}
