import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../util/app-constants';
import {Observable} from 'rxjs';
import {Bug} from '../dto/bug';


@Injectable()
export class BugService {

  constructor(private httpClient: HttpClient) {
  }

  getBug(bugId: number): Observable<Bug> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Bug>(AppConstants.BUG_URL + '/' + bugId, {headers: header});
  }

  getAllBugs(): Observable<Bug[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Bug[]>(AppConstants.BUG_URL + '/all', {headers: header});
  }

  getAllBugsByOrganizationId(id: number): Observable<Bug[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Bug[]>(AppConstants.BUG_URL + '/organization/' + id, {headers: header});
  }

  getAllBugsByUserId(id: number): Observable<Bug[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Bug[]>(AppConstants.BUG_URL + '/user/' + id, {headers: header});
  }

  createBug(bug: Bug): Observable<Bug> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<Bug>(AppConstants.BUG_URL, bug, {headers: header});
  }

  updateBug(bug: Bug): Observable<Bug> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<Bug>(AppConstants.BUG_URL, bug, {headers: header});
  }

  deleteBug(bugId: number) {
    return this.httpClient.delete(AppConstants.BUG_URL + '/' + bugId);
  }
}
