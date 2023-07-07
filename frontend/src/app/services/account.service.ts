import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  constructor() { }
  getTodos() {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/todos');
  }
}
