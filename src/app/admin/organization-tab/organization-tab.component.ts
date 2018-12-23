import {Component, OnInit} from '@angular/core';
import {Organization} from '../../dto/organization';
import {MatDialog} from '@angular/material';
import {OrganizationService} from '../../service/organization-service';
import {OrganizationDialogComponent} from '../../dialog/organization-dialog/organization-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-organization-tab',
  templateUrl: './organization-tab.component.html',
  styleUrls: ['./organization-tab.component.css']
})
export class OrganizationTabComponent implements OnInit {

  organizationList: Organization[] = [];

  REMOVE_ORGANIZATION = 'organization';

  constructor(private dialog: MatDialog,
              private organizationService: OrganizationService,
              public formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {

  }

  openNewOrganizationDialog() {
    const organizationFormGroup: FormGroup = this.formBuilder.group({
      'id': new FormControl(null),
      'name': new FormControl('', Validators.required),
      'user': new FormControl(null, Validators.required)
    });

    const dialogRef = this.dialog.open(OrganizationDialogComponent, {
      minWidth: '60%',
      minHeight: '50%',
      data: {
        organizationFormGroup
      }
    });


    dialogRef.afterClosed()
      .subscribe(result => {
        if (result != null) {
          const organization: Organization = Organization.getBlankOrganization();
          organization.name = result.organizationFormGroup.controls['name'].value;
          // organization.userList = result.adminList;

          this.organizationService.createOrganization(organization).subscribe(
            (response) => this.organizationList.push(response),
            (error) => console.log(error)
          );
        }
      });

  }

  openEditOrganizationDialog(organization: Organization) {
    //
    //   const organizationFormGroup: FormGroup = this.formBuilder.group({
    //     'id': new FormControl(organization.id),
    //     'name': new FormControl(organization.name, Validators.required),
    //     'user': new FormControl(null, Validators.required)
    //   });
    //
    //   const dialogRef = this.dialog.open(OrganizationDialogComponent, {
    //     minWidth: '60%',
    //     minHeight: '50%',
    //     data: {
    //       organizationFormGroup
    //     }
    //   });
    //
    //   // dialogRef.afterClosed()
    //   //   .subscribe(result => {
    //   //     if (result != null) {
    //   //       organization.id = result.organizationFormGroup.controls['id'].value;
    //   //       organization.name = result.organizationFormGroup.controls['name'].value;
    //   //
    //   //       this.organizationService.updateOrganization(organization).subscribe(
    //   //         (response) => console.log('Organization was updated. Id ' + organization.id),
    //   //         (error) => console.log(error));
    //   //     }
    //   //   });
  }

  openRemoveOrganizationDialog(organizationId: number, organizationName: string, removeType: string) {

  }

  openEditOrganizationUsersDialog(organization: Organization) {

  }

}
