import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AppConstants} from '../util/app-constants';
import {User} from '../dto/user';
import {Observable} from 'rxjs';


@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getUser(userId: number, brief: string): Observable<User> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});

    let params = new HttpParams();
    params = params.append('brief', brief);

    return this.httpClient.get<User>(AppConstants.USER_URL + '/' + userId, {headers: header, params: params});
  }

  getAllUsers(): Observable<User[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<User[]>(AppConstants.USER_URL + '/all', {headers: header});
  }

  checkCredentials(authenticationHeaderValue: string, userName: string): Observable<User> {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': authenticationHeaderValue});
    return this.httpClient.get<User>(AppConstants.USER_URL + "/" +userName + '/authenticate', {headers: authHeader});
  }

  getAllUsersByOrganizationId(id: number): Observable<User[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<User[]>(AppConstants.USER_URL + '/organization/' + id, {headers: header});
  }

  getAllUsersByProjectId(projectId: number): Observable<User[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<User[]>(AppConstants.USER_URL + '/project/' + projectId, {headers: header});
  }

  createUser(user: User): Observable<User> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<User>(AppConstants.USER_URL, user, {headers: header});
  }

  updateUser(user: User): Observable<User> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<User>(AppConstants.USER_URL, user, {headers: header});
  }

  deleteUser(userId: number) {
    return this.httpClient.delete(AppConstants.USER_URL + '/' + userId);
  }
}
