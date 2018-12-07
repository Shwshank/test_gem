import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private jwtHelper: JwtHelper) { }

    canActivate() {
        if (localStorage.getItem('certauthCurrentUser')) {
            // logged
            const currentUser = JSON.parse(localStorage.getItem('certauthCurrentUser'));
// check if the accessToken has expired by more than 60 minutes
// if so, send the user to login page
// else return true
const currentDateTime: any = new Date();
const expiryDateTime: any = this.jwtHelper.getTokenExpirationDate(currentUser.accessToken);
if ((currentDateTime - expiryDateTime) / 60 > 60) {
  // token expiry is exceeded by more than 60 minutes, send to login
  this.router.navigateByUrl('pages/login');
  return false;
} else {
  return true;
}
  } else {
        // not logged in so redirect to login page
        this.router.navigateByUrl('pages/login');
        return false;
  }
}
}

