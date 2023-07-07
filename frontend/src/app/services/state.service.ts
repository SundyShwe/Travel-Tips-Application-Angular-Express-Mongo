import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import IState from '../models/istate';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _state = new BehaviorSubject<IState>(initial_state);
  constructor() { }
  getState() {
    return this._state.asObservable();
  }
  setState(new_state: IState) {
    this._state.next(new_state);
    return this._state.value;
  }

  getUserId(): string {
    return this._state.value._id;
  }
}

export const initial_state = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  badges: [],
  totalActivities: 0,
  jwt: ""
}
