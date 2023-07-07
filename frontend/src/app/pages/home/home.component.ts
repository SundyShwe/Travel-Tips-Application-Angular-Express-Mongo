import { Component, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import IActivity from 'src/app/models/iactivity';
import IState from 'src/app/models/istate';
import { ActivityService } from 'src/app/services/activity.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  myActivities!: IActivity[];
  private stateService = inject(StateService);
  private activityService = inject(ActivityService);
  private destroySubject: Subject<void> = new Subject();
  state!: IState;
  pageSize = 6;
  page = 1;
  total = 0;
  totalActivities!: string;
  constructor() {
    this.stateService.getState().pipe(
      takeUntil(this.destroySubject)
    ).subscribe(response => {
      if (response) this.state = response;
    });

    this.activityService.getActivities().pipe(
      takeUntil(this.destroySubject)
    ).subscribe(response => {
      if (response.success) {
        this.myActivities = response.data;
        this.total = this.myActivities.length;
        this.totalActivities = localStorage.getItem('APP_TOTAL_ACTIVITIES') || '0';
      }
    });
  }
  onDelete(activity_id: string) {
    this.activityService.deleteActivity(activity_id).pipe(
      takeUntil(this.destroySubject)
    ).subscribe(response => {
      if (response.success) {
        this.myActivities = this.myActivities.filter(item => item._id != activity_id);
        this.total = this.myActivities.length;
        this.totalActivities = response.data.totalActivities;
        localStorage.setItem('APP_TOTAL_ACTIVITIES', response.data.totalActivities);
      }
    });
  }
  ngOnDestroy() {
    this.destroySubject.next();
  }
}
