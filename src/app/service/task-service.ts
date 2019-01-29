import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../util/app-constants';
import {Observable} from 'rxjs';
import {Task} from '../dto/task';


@Injectable()
export class TaskService {

  constructor(private httpClient: HttpClient) {
  }

  getTask(taskId: number): Observable<Task> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Task>(AppConstants.TASK_URL + '/' + taskId, {headers: header});
  }

  getAllTasks(): Observable<Task[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Task[]>(AppConstants.TASK_URL + '/all', {headers: header});
  }

  getAllTasksByOrganizationId(id: number): Observable<Task[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Task[]>(AppConstants.TASK_URL + '/organization/' + id, {headers: header});
  }

  getAllTasksByUserId(id: number): Observable<Task[]> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Task[]>(AppConstants.TASK_URL + '/user/' + id, {headers: header});
  }

  createTask(task: Task): Observable<Task> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<Task>(AppConstants.TASK_URL, task, {headers: header});
  }

  updateTask(task: Task): Observable<Task> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<Task>(AppConstants.TASK_URL, task, {headers: header});
  }

  deleteTask(taskId: number) {
    return this.httpClient.delete(AppConstants.TASK_URL + '/' + taskId);
  }
}
