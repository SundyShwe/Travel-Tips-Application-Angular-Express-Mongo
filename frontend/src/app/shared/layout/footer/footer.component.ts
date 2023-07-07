import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import IState from 'src/app/models/istate';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnDestroy {
  state!: IState;
  private subscription!: Subscription;
  constructor(private stateService: StateService) {
    this.subscription = this.stateService.getState().subscribe(state => {
      this.state = state;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
