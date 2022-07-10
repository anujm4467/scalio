import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(public router: Router, private authService: AuthService) { }

  canActivate(): boolean | Observable<boolean> {
    return this.checkAuthentication();
  }

  canLoad(): boolean | Observable<boolean> {
    return this.checkAuthentication();
  }

  checkAuthentication(): boolean | Observable<boolean> {
    return this.authService.isLoggedInAsync;
  }
}
