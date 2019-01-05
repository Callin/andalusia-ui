import {Component, OnInit} from '@angular/core';
import {Organization} from '../../dto/organization';
import {MatDialog} from '@angular/material';
import {OrganizationService} from '../../service/organization-service';
import {OrganizationDialogComponent} from '../../dialog/organization-dialog/organization-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RemoveDialogComponent} from "../../dialog/remove-dialog/remove-dialog.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-organization-tab',
  templateUrl: './organization-tab.component.html',
  styleUrls: ['./organization-tab.component.css']
})
export class OrganizationTabComponent implements OnInit {

  organizationList: Organization[] = [];

  constructor(private dialog: MatDialog,
              private organizationService: OrganizationService,
              public formBuilder: FormBuilder,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.organizationService.getAllOrganizations().subscribe(
      (organizations) => this.organizationList = organizations,
      (error) => console.log(error));
  }

  openNewOrganizationDialog() {
    const organizationFormGroup: FormGroup = this.formBuilder.group({
      'id': new FormControl(null),
      'name': new FormControl('', Validators.required),
      'description': new FormControl(null, Validators.required)
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
          organization.description = result.organizationFormGroup.controls['description'].value;

          this.organizationService.createOrganization(organization).subscribe(
            (response) => this.organizationList.push(response),
            (error) => console.log(error)
          );
        }
      });

  }

  openEditOrganizationDialog(organization: Organization) {

    const organizationFormGroup: FormGroup = this.formBuilder.group({
      'id': new FormControl(organization.id),
      'name': new FormControl(organization.name, Validators.required),
      'description': new FormControl(organization.description)
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
          organization.id = result.organizationFormGroup.controls['id'].value;
          organization.name = result.organizationFormGroup.controls['name'].value;
          organization.description = result.organizationFormGroup.controls['description'].value;

          this.organizationService.updateOrganization(organization).subscribe(
            (response) => console.log('Organization was updated. Id ' + organization.id),
            (error) => console.log(error));
        }
      });
  }

  openRemoveOrganizationDialog(organization: Organization) {
    const type = 'bug';
    const name = organization.name;
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
        this.organizationService.deleteOrganization(organization.id)
          .subscribe((response) => {
              if (response == null) {
                const indexOfOrganization = this.organizationList.findIndex(item => item.id === organization.id);
                this.organizationList.splice(indexOfOrganization, 1);
                this.toastr.success(organization.name + ' was removed', 'Organization removed');
              }
            },
            (error) => {
              this.toastr.error(organization.name + ' was not removed', 'Organization removal failed');
              console.log(error);
            });
      }
    });
  }

  openEditOrganizationUsersDialog(organization: Organization) {

  }

}
