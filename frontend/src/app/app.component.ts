import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import IState from './models/istate';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  state!: IState;
  private subscription!: Subscription;
  private stateService = inject(StateService);
  constructor() {
    this.subscription = this.stateService.getState().subscribe(state => {
      this.state = state;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
