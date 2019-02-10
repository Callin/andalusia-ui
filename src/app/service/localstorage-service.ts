import {Inject, Injectable, InjectionToken} from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AppConstants} from '../util/app-constants';
import {User} from '../dto/user';
import {Observable} from 'rxjs';
import {StorageService} from "ngx-webstorage-service";

export const LOCAL_STORAGE_SERVICE = new InjectionToken<StorageService>('LOCAL_STORAGE_SERVICE');

@Injectable()
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE_SERVICE) private storage: StorageService) {
  }

  set(key: string, value: any) {
    this.storage.set(key, value);
  }

  get(key: string): any {
    return this.storage.get(key);
  }

  remove(key: string) {
    this.storage.remove(key);
  }
}
