import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import IRating from '../models/irating';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private http = inject(HttpClient);
  constructor() { }
  getRatings(aid: string) {
    return this.http.get<{ success: true, data: IRating }>(environment.HTTP_SEVER + '/ratings/' + aid);
  }
  addRatingToActivity(data: any) {
    return this.http.post<{ success: true, data: any }>(environment.HTTP_SEVER + '/ratings/' + data.activity_id, data);
  }
}
