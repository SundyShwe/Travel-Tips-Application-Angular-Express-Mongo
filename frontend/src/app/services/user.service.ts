import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import IUser from '../models/iuser';
import { StateService } from './state.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  constructor() { }
  getUserById(uid: string) {
    return this.http.get<{ success: boolean, data: IUser }>(environment.HTTP_SEVER + '/users/' + uid);
  }

  changePassword(new_password: any) {
    console.log(new_password)
    return this.http.post<{ success: boolean, data: any }>(environment.HTTP_SEVER + '/users/' + new_password.user_id, new_password);
  }

}
