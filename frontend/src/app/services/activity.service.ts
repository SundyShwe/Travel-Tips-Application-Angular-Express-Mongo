import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import IActivity from '../models/iactivity';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private http = inject(HttpClient);
  constructor() { }
  getActivities() {
    return this.http.get<{ success: boolean, data: IActivity[] }>(environment.HTTP_SEVER + '/activities');
  }

  createActivity(data: IActivity) {
    return this.http.post<{ success: boolean, data: IActivity }>(environment.HTTP_SEVER + '/activities', data);
  }

  deleteActivity(activity_id: string) {
    return this.http.delete<{ success: boolean, data: any }>(environment.HTTP_SEVER + '/activities/' + activity_id);
  }

  updateActivity(data: IActivity) {
    return this.http.put<{ success: boolean, data: any }>(environment.HTTP_SEVER + '/activities', data);
  }
}
