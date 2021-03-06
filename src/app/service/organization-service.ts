import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AppConstants} from '../util/app-constants';
import {Organization} from '../dto/organization';
import {Observable} from 'rxjs';


@Injectable()
export class OrganizationService {

  constructor(private httpClient: HttpClient) {
  }

  getOrganization(organizationId: number): Observable<Organization> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpClient.get<Organization>(AppConstants.ORGANIZATION_URL + '/' + organizationId, {headers: header});
  }

  getAllOrganizations(): Observable<Organization[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Organization[]>(AppConstants.ORGANIZATION_URL + '/all', {headers: header});
  }

  getAllOrganizationsByUserId(userId: number): Observable<Organization[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Organization[]>(AppConstants.ORGANIZATION_URL + '/user/' + userId, {headers: header});
  }

  createOrganization(organization: Organization): Observable<Organization> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<Organization>(AppConstants.ORGANIZATION_URL, organization, {headers: header});
  }

  updateOrganization(organization: Organization): Observable<Organization> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<Organization>(AppConstants.ORGANIZATION_URL, organization, {headers: header});
  }

  deleteOrganization(organizationId: number) {
    return this.httpClient.delete(AppConstants.ORGANIZATION_URL + '/' + organizationId);
  }
}
