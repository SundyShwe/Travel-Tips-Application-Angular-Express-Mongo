import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { RatingService } from 'src/app/services/rating.service';
import ICity from 'src/app/models/icity';
import ITransport from 'src/app/models/itransport';
import IActivity from 'src/app/models/iactivity';
import IUser from 'src/app/models/iuser';
import { Subject, takeUntil } from 'rxjs';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import IRating from 'src/app/models/irating';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css']
})
export class CityDetailsComponent {
  cid: string = '';
  private cityService = inject(CityService);
  private router = inject(Router);
  private destroySubject: Subject<void> = new Subject();
  private ratingService = inject(RatingService);
  private activeRoute = inject(ActivatedRoute);

  faCheckSquare = faCheckSquare;
  city!: ICity;
  user!: IUser;
  rating !: IRating;
  transports: ITransport[] = [];
  activities: IActivity[] = [];
  pageSize = 4;
  page = 1;
  total = 0;
  ratingControl = new FormControl(0);
  avgRating = 0;

  constructor() {
    this.cid = this.activeRoute.snapshot.params['city_id'];
    //get citi details
    this.cityService.getCityById(this.cid).pipe(
      takeUntil(this.destroySubject)
    ).subscribe(response => {
      if (response.success) {
        this.city = response.data;
        this.transports = this.city.transports;
      }
    });

    //get actitities under city
    this.loadActivities();


  }

  rateActivity(id: any) {
    const new_rating = { 'activity_id': id, 'new_rating': this.ratingControl.value };

    this.ratingService.addRatingToActivity(new_rating).pipe(
      takeUntil(this.destroySubject)
    ).subscribe(response => {
      if (response.success) {
        this.rating = response.data;

        this.loadActivities();
        this.ratingControl.setValue(0);

      }
    })

  }

  loadActivities() {
    this.cityService.getActivitesByCity(this.cid).pipe(
      takeUntil(this.destroySubject)
    ).subscribe(response => {
      if (response.success) {
        this.activities = response.data;
        this.total = this.activities.length;
      }
    })
  }

  goToProfile(user_id: string) {
    this.router.navigate(['', 'profile', user_id]);
  }

  goToTransport(transport_id: string) {
    this.router.navigate(['', 'cities', this.cid, 'transports', transport_id]);

  }

  addTravelTip() {
    this.router.navigate(['', 'add-activities']);

  }

  ngOnDestroy() {
    this.destroySubject.next();
  }
}
