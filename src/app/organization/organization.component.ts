import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";
import {User} from "../dto/user";
import {Organization} from "../dto/organization";
import {MatDialog} from "@angular/material";
import {OrganizationService} from "../service/organization-service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  users: User[] = [];
  organization: Organization;

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private organizationService: OrganizationService) {
  }

  ngOnInit() {
    this.organizationService.getOrganization(this.route.snapshot.params['id']).subscribe(
      (organization) => this.organization = organization,
      (error) => console.log(error));
  }

  isNull(item: any) {
    return isNullOrUndefined(item)
  }

}
