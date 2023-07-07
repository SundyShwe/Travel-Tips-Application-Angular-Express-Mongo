import { Injectable, inject } from '@angular/core';
import IUser from '../models/iuser';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  constructor() { }

  signup(data: IUser) {
    return this.http.post<{ success: boolean, data: IUser }>(environment.HTTP_SEVER + '/signup', data);
  }

  signin(data: IUser) {
    return this.http.post<{ success: boolean, data: string }>(environment.HTTP_SEVER + '/signin', data);
  }
}
