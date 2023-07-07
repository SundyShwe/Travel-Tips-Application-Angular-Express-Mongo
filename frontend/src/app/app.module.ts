import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StateService } from './services/state.service';
import { SignupComponent } from './auth/signup/signup.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { AddActivitiesComponent } from './pages/add-activities/add-activities.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTokenInterceptor } from './add-token.interceptor';
import { SharedModule } from './shared/shared.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

function bootstrap(stateService: StateService) {
  return () => {
    const persisted_state = localStorage.getItem('APP_STATE');
    if (persisted_state) stateService.setState(JSON.parse(persisted_state));
  }
}
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    WelcomeComponent,
    HomeComponent,
    AddActivitiesComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    SharedModule,
    NgbDropdownModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: bootstrap, deps: [StateService], multi: true },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: AddTokenInterceptor }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
