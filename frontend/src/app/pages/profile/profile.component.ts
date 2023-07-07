import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from '../../services/state.service';
import { FormBuilder, Validators } from '@angular/forms';
import IUser from '../../models/iuser';
import IBadge from '../../models/ibadge';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  private stateService = inject(StateService);
  private userService = inject(UserService);
  private subscription!: Subscription;
  private activeRoute = inject(ActivatedRoute);
  userId: string = '';
  user!: IUser;
  badge!: IBadge;
  viewOnly: boolean = true;

  passwordForm = inject(FormBuilder).nonNullable.group({
    new_password: ['', [Validators.required, Validators.minLength(6)]],
    confirm_password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    const uid = this.activeRoute.snapshot.params['user_id'];
    if (uid) this.userId = uid;
    else {
      this.userId = this.stateService.getUserId();
      this.viewOnly = false;
    }

    this.subscription = this.userService.getUserById(this.userId).subscribe(response => {
      if (response.success) {
        this.user = response.data;
      }
    })

  }

  onSubmit() {
    if (this.passwordForm.value.new_password !== this.passwordForm.value.confirm_password) {
      alert('Please confirm your new password');
    }
    else {
      const psw = { 'user_id': this.userId, 'password': this.passwordForm.value.new_password };
      this.userService.changePassword(psw).subscribe(response => {
        if (response.success) {
          Swal.fire({
            title: 'Hooray!!!',
            text: 'You have succesfully changed the password!',
            icon: 'success'
          });
          this.passwordForm.reset();
        }
      })
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
