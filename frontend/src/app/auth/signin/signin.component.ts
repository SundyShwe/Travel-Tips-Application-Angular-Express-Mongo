import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import IUser from 'src/app/models/iuser';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnDestroy {
  private authService = inject(AuthService);
  private stateService = inject(StateService);
  private router = inject(Router);
  private subscription!: Subscription;
  signinForm = inject(FormBuilder).nonNullable.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    this.subscription = this.stateService.getState().subscribe(state => {
      if (state._id) this.router.navigate(['', 'home']);
    })
  }

  onSubmit() {
    this.subscription = this.authService.signin(this.signinForm.value as IUser).subscribe(response => {
      if (response.success) {
        const encrypted_token = response.data;
        const decoded_token = jwt_decode(encrypted_token) as IUser;
        const state = {
          ...decoded_token,
          jwt: encrypted_token
        };
        this.stateService.setState(state);
        localStorage.setItem('APP_STATE', JSON.stringify(state));
        localStorage.setItem('APP_TOTAL_ACTIVITIES', JSON.stringify(state.totalActivities));

        Swal.fire({
          title: 'Hooray!!!',
          text: 'You are succesfully signed in!',
          icon: 'success'
        });

        this.router.navigate(['', 'home']);
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
