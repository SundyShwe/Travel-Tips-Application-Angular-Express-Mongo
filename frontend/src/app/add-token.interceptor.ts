import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateService } from './services/state.service';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
  private stateService = inject(StateService);
  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser = localStorage.getItem('APP_STATE');
    if (!currentUser) return next.handle(request);
    const clone = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + JSON.parse(currentUser).jwt)
    });
    return next.handle(clone);
  }
}
