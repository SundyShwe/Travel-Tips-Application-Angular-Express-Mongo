import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import ICity from 'src/app/models/icity';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent {
  private City = inject(CityService);
  private router = inject(Router);
  private subscription!: Subscription;
  cities: ICity[] = [];
  pageSize = 6;
  page = 1;
  total = 0;

  constructor() {
    this.subscription = this.City.getCities().subscribe(response => {
      if (response.success) {
        this.cities = response.data;
        this.total = this.cities.length;
      }
    });
  }

  goToCity(id: string) {
    this.router.navigate(['', 'cities', id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
