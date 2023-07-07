import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { StateService, initial_state } from 'src/app/services/state.service';
import { Router } from '@angular/router';
import { faHouseChimneyWindow, faSquareArrowUpRight, faTreeCity, faClipboardList, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import IState from 'src/app/models/istate';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  state!: IState;
  private router = inject(Router);
  private subscription!: Subscription;
  public isCollapsed = true;
  navbarOpen = false;
  faHouseChimneyWindow = faHouseChimneyWindow;
  faTreeCity = faTreeCity;
  faSquareArrowUpRight = faSquareArrowUpRight;
  faClipboardList = faClipboardList;
  faUser = faUser;

  constructor(private stateService: StateService) {
    this.subscription = this.stateService.getState().subscribe(state => {
      this.state = state;
    });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnInit(): void {
  }

  goToProfile() {
    this.router.navigate(['', 'profile']);
  }

  signOut() {
    this.stateService.setState(initial_state);
    localStorage.clear();
    this.router.navigate(['', 'welcome']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
