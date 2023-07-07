import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import ICity from '../models/icity';
import { environment } from 'src/environments/environment.development';
import IActivity from '../models/iactivity';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private http = inject(HttpClient);

  getCities() {
    return this.http.get<{ success: boolean, data: ICity[] }>(environment.HTTP_SEVER + '/cities');
  }

  getCityById(cid: string) {
    return this.http.get<{ success: boolean, data: ICity }>(environment.HTTP_SEVER + '/cities/' + cid);
  }

  getActivitesByCity(cid: string) {
    //console.log('in service', environment.HTTP_SEVER + '/cities/' + cid + '/activities/')
    return this.http.get<{ success: boolean, data: IActivity[] }>(environment.HTTP_SEVER + '/cities/' + cid + '/activities/');
  }

  //get transport

  constructor() { }
}
