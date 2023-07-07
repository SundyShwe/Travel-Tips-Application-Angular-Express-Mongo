import { Component, Inject, OnDestroy, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSquareXmark, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import IActivity from 'src/app/models/iactivity';
import ICity from 'src/app/models/icity';
import IItem from 'src/app/models/iitem';
import { ActivityService } from 'src/app/services/activity.service';
import { CityService } from 'src/app/services/city.service';
import { StateService } from 'src/app/services/state.service';
import { Subject, takeUntil } from 'rxjs'
import IUser from 'src/app/models/iuser';

@Component({
  selector: 'app-add-activities',
  templateUrl: './add-activities.component.html',
  styleUrls: ['./add-activities.component.css']
})
export class AddActivitiesComponent implements OnDestroy {
  faSquareXmark = faSquareXmark;
  faCircleArrowRight = faCircleArrowRight;
  private stateService = inject(StateService);
  private cityService = inject(CityService);
  private activityService = inject(ActivityService);
  private router = inject(Router);
  private destroySubject: Subject<void> = new Subject();
  user!: IUser;
  activityList!: IActivity;
  cities!: ICity[];
  cityId!: string;
  city!: ICity;
  cityName!: string;
  items: IItem[] = [];
  activityForm = inject(FormBuilder).nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    category: [''],
    // completed: false
  });

  constructor() {
    this.stateService.getState().pipe(
      takeUntil(this.destroySubject)
    ).subscribe(response => {
      if (response) this.user = { ...response, password: '', profilePic: '' };
    });
    this.cityService.getCities().pipe(
      takeUntil(this.destroySubject)
    ).subscribe(response => {
      if (response.success) this.cities = response.data;
    });
  }

  onChange(e: any) {
    this.cityId = e.target.value;
    const result = this.cities.find(element => element._id === this.cityId);
    if (result) {
      var city: ICity = { _id: result._id, name: result.name, state: result.state, location: result.location, transports: [] };
      this.city = city;
      this.cityName = city.name;
    }
  }

  onSubmit(value: any) {
    if (value.title && value.category) {
      var item: IItem = { _id: this.items.length + 1 + 'iitem', title: value.title, description: value.description, category: value.category, completed: false };
      this.items.push(item);
      this.resetForm(value);
    }
  }

  onRemove(id: any) {
    this.items = this.items.filter(item => item._id != id);
  }

  onSave() {
    for (let object of this.items) {
      delete object._id;
    }
    var activity: IActivity = {
      user: this.user,
      city: this.city,
      items: this.items,
      userRatings: { ratingCount: 0, totalRating: 0 }
    }
    this.activityService.createActivity(activity as IActivity).pipe(
      takeUntil(this.destroySubject)
    ).subscribe(response => {
      if (response.success) {
        if (response.data.totalActivities) {
          localStorage.setItem('APP_TOTAL_ACTIVITIES', response.data.totalActivities.toString());
        }
        this.router.navigate(['', 'home']);
      }
    });
  }

  resetForm(value: ICity) {
    this.activityForm.setValue({
      title: "",
      description: "",
      category: ""
    });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }
}
