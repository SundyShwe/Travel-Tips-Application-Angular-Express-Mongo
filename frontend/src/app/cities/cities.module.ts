import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CityListComponent } from './city-list/city-list.component';
import { CityDetailsComponent } from './city-details/city-details.component';
import { TransportComponent } from './transport/transport.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: CityListComponent },
  { path: ':city_id', component: CityDetailsComponent },
  { path: ':city_id/transports/:transport_id', component: TransportComponent },
];

@NgModule({
  declarations: [
    CityListComponent,
    CityDetailsComponent,
    TransportComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CitiesModule { }
