import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import IReview from '../models/ireview';
import { environment } from 'src/environments/environment.development';
import ITransport from '../models/itransport';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  private http = inject(HttpClient);

  //get reviews
  getTransport(cid: string, tid: string) {

    return this.http.get<{ success: true, data: any[] }>(environment.HTTP_SEVER + '/cities/' + cid + '/transports/' + tid);
  }

  //addreview
  addReview(cid: string, tid: string, new_review: any) {
    return this.http.post<{ success: true, data: any }>(environment.HTTP_SEVER + '/cities/' + cid + '/transports/' + tid, new_review);
  }


  //add review

  constructor() { }
}
