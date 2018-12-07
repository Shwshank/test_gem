import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

   // rrc
  erMsg:string;
  erMsgFound:boolean;
  alertShown:boolean;
   // rrc

  constructor(private injector: Injector, private jwtHelper: JwtHelper, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth: AuthenticationService = this.injector.get(AuthenticationService);
    console.log('intercepted request ... ');

    // Clone the request to add the new Authorization header, if the end point for this request does not end in /tokens.

    let authReq = req.clone();

    // console.log("... req.url ...");
    // console.log(req.url);

    var foundStr1 = req.url.search('/TestController'); // rrc
    // console.log(foundStr1); // rrc

    // const authReq = req.clone({headers:req.headenablnablCurrentUserrs.set('Authorization','Bearer '+nablCurrentUser.accessToken)});
    if (!req.url.toLocaleLowerCase().endsWith('/tokens') && !req.url.toLocaleLowerCase().endsWith('/otp') && !req.url.toLocaleLowerCase().endsWith('/totalrecordviewer') && !req.url.toLocaleLowerCase().endsWith('/mapdata') && foundStr1 < 0 ) {
      const currentUser = JSON.parse(localStorage.getItem('certauthCurrentUser'));
      // check if the accessToken is null, if so, re-direct to login page 
      if (! currentUser.accessToken) {
      this.router.navigateByUrl('pages/login');
      return;
      }
      
      // check if accessToken is expired, if so, call authentication service refresh token mehod
      if (this.jwtHelper.isTokenExpired(currentUser.accessToken)) {

        console.log("...Inside auth.interceptor isTokenExpired..."); // rrc

        if(this.alertShown != true){
          this.alertShown = true;
          alert("Your login session might has expired.\nIf problem persists, Sign-in again in portal !!") // rrc
        }

        auth.refreshToken(req, next, currentUser.refreshToken);
        return;
      }
      
      // if we have reached here, it means that we have a valid accessToken, so append it and send request
      authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + currentUser.accessToken)});
      console.log("...authReq..."); // rrc
      console.log(authReq); // rrc

    } // ends if (!req.url.toLocaleLowerCase().endsWith('/token

    console.log('AuthIncept Sending request with new header now ...');

    // send the newly created request
    return next.handle(authReq)
    .catch((error, caught) => {
      // intercept the respons error and displace it to the console
      console.log('..AuthIncept Error Occurred...');
      
       // rrc
      console.log(error);
      //console.log(error.error);

      this.erMsg = "";
      this.erMsg = error.error;

      console.log("..AuthIncept 1...");
      this.erMsgFound = this.erMsg.toString().trim().toLowerCase().startsWith("Could not verify username/ password or refresh token".toLowerCase());            

      if(this.erMsgFound == true){
        if(this.alertShown != true){
          this.alertShown = true;
          //alert("Your login session has expired. To continue on portal, Sign in again\nCould not verify username/ password or refresh token !!"); // Login session may have expired !!\n Close all tabs & Please Login again    
          console.log("this.erMsgFound.. Could not verify user... " + this.erMsgFound);
          //return Observable.throw(error);
        }
      }

      console.log("..AuthIncept 2...");
      this.erMsgFound = this.erMsg.toString().trim().toLowerCase().startsWith("Grant type is compulsory field".toLowerCase());
      
      if(this.erMsgFound == true){
        if(this.alertShown != true){
          this.alertShown = true;
          //alert("Your login session has expired. To continue on portal, Sign in again\nGrant type is compulsory field !!");
          console.log("this.erMsgFound.. Grant type... " + this.erMsgFound);
          //return Observable.throw(error);
        }
      }

      console.log("..AuthIncept 3...");
      this.erMsg = error.error.message;

      if(this.erMsg){
        this.erMsgFound = this.erMsg.toString().trim().toLowerCase().startsWith("Invalid login".toLowerCase());

        if(this.erMsgFound == true){
          if(this.alertShown != true){
            this.alertShown = true;
            //alert("Your login session has expired. To continue on portal, Sign in again\nInvalid login !!");
            console.log("this.erMsgFound.. Invalid login... " + this.erMsgFound);
            //return Observable.throw(error);
          }
        }
    }
       // rrc

      //this.router.navigateByUrl('pages/login');
      //console.log(error);

      // return the error to the method that called it
      return Observable.throw(error);
    }) as any;

  } // ends intercept

} // ends export class

