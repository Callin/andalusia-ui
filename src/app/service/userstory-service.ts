import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../util/app-constants';
import {Observable} from 'rxjs';
import {UserStory} from "../dto/user-story";


@Injectable()
export class UserStoryService {

  constructor(private httpClient: HttpClient) {
  }

  getUserStory(userStoryId: number): Observable<UserStory> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<UserStory>(AppConstants.USER_STORY_URL + '/' + userStoryId, {headers: header});
  }

  getAllUserStorys(): Observable<UserStory[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<UserStory[]>(AppConstants.USER_STORY_URL + '/all', {headers: header});
  }

  getAllUserStorysByOrganizationId(id: number): Observable<UserStory[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<UserStory[]>(AppConstants.USER_STORY_URL + '/organization/' + id, {headers: header});
  }

  getAllUserStorysByUserId(id: number): Observable<UserStory[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<UserStory[]>(AppConstants.USER_STORY_URL + '/user/' + id, {headers: header});
  }

  createUserStory(userStory: UserStory): Observable<UserStory> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<UserStory>(AppConstants.USER_STORY_URL, userStory, {headers: header});
  }

  updateUserStory(userStory: UserStory): Observable<UserStory> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<UserStory>(AppConstants.USER_STORY_URL, userStory, {headers: header});
  }

  deleteUserStory(userStoryId: number) {
    return this.httpClient.delete(AppConstants.USER_STORY_URL + '/' + userStoryId);
  }
}
