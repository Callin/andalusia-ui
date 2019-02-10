import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AppConstants} from '../util/app-constants';
import {Project} from '../dto/project';
import {Observable} from 'rxjs';


@Injectable()
export class ProjectService {

  constructor(private httpClient: HttpClient) {
  }

  getProject(projectId: number): Observable<Project> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Project>(AppConstants.PROJECT_URL + '/' + projectId, {headers: header});
  }

  getProjectBrief(projectId: number): Observable<Project> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Project>(AppConstants.PROJECT_URL + '/' + projectId + '/brief', {headers: header});
  }

  getAllProjects(): Observable<Project[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Project[]>(AppConstants.PROJECT_URL + '/all', {headers: header});
  }

  getAllProjectsByOrganizationId(id: number): Observable<Project[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Project[]>(AppConstants.PROJECT_URL + '/organization/' + id, {headers: header});
  }

  getAllProjectsByUserId(id: number): Observable<Project[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Project[]>(AppConstants.PROJECT_URL + '/user/' + id, {headers: header});
  }

  createProject(project: Project): Observable<Project> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<Project>(AppConstants.PROJECT_URL, project, {headers: header});
  }

  updateProject(project: Project): Observable<Project> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<Project>(AppConstants.PROJECT_URL, project, {headers: header});
  }

  deleteProject(projectId: number) {
    return this.httpClient.delete(AppConstants.PROJECT_URL + '/' + projectId);
  }
}
