import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AppConstants} from '../util/app-constants';
import {Sprint} from '../dto/sprint';
import {Observable} from 'rxjs';


@Injectable()
export class SprintService {

  constructor(private httpClient: HttpClient) {
  }

  getSprint(sprintId: number, brief: string): Observable<Sprint> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});

    let params = new HttpParams();
    params = params.append('brief', brief);

    return this.httpClient.get<Sprint>(AppConstants.SPRINT_URL + '/' + sprintId, {headers: header, params: params});
  }

  getAllSprints(): Observable<Sprint[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Sprint[]>(AppConstants.SPRINT_URL + '/all', {headers: header});
  }

  createSprint(sprint: Sprint): Observable<Sprint> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<Sprint>(AppConstants.SPRINT_URL, sprint, {headers: header});
  }

  updateSprint(sprint: Sprint): Observable<Sprint> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<Sprint>(AppConstants.SPRINT_URL, sprint, {headers: header});
  }

  deleteSprint(sprintId: number) {
    return this.httpClient.delete(AppConstants.SPRINT_URL + '/' + sprintId);
  }
}
