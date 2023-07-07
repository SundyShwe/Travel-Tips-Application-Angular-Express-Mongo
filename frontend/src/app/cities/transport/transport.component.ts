import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { TransportService } from 'src/app/services/transport.service';
import IReview from 'src/app/models/ireview';
import ICity from 'src/app/models/icity';
import ITransport from 'src/app/models/itransport';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent {

  isShowDiv = true;
  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }

  private cityService = inject(CityService);
  private stateService = inject(StateService);
  private tansportService = inject(TransportService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);
  private destroySubject: Subject<void> = new Subject();
  userId: string = '';
  transport_id: string = '';
  city_id: string = '';
  reviews: IReview[] = [];
  city!: ICity;
  transport!: ITransport;
  results: any[] = [];

  pageSize = 4;
  page = 1;
  total = 0;

  reviewForm = inject(FormBuilder).nonNullable.group({
    content: ['', Validators.required],
  });


  constructor() {
    this.city_id = this.activeRoute.snapshot.params['city_id'];
    this.transport_id = this.activeRoute.snapshot.params['transport_id'];
    this.userId = this.stateService.getUserId();

    //get citi details
    this.cityService.getCityById(this.city_id).pipe(
      takeUntil(this.destroySubject)
    ).subscribe(response => {
      if (response.success) {
        this.city = response.data;
      }
    });

    this.loadReviews();

  }

  loadReviews() {
    //get reviews of transport
    this.tansportService.getTransport(this.city_id, this.transport_id).pipe(
      takeUntil(this.destroySubject)
    ).subscribe(response => {

      if (response.success) {
        this.results = response.data;
        //console.log(this.results[0].transports);
        this.transport = this.results[0].transports;
        this.reviews = this.transport.reviews;
        this.total = this.reviews.length;
      }
    });
  }

  onSubmit() {

    const new_review = { 'user_id': this.userId, 'content': this.reviewForm.value.content };
    this.tansportService.addReview(this.city_id, this.transport_id, new_review).subscribe(response => {
      if (response.success) {
        this.loadReviews();
        this.reviewForm.reset();
        this.toggleDisplayDiv();
      }
    })

  }

  goToCity(cid: string) {
    this.router.navigate(['', 'cities', cid]);
  }

  ngOnDestroy() {
    this.destroySubject.next();
  }



}
