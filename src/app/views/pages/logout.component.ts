import { Component, ViewChild, ElementRef, ViewEncapsulation  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Body } from '@angular/http/src/body';
import { error } from 'util';
import { AuthenticationService } from './../../services/authentication.service';
import { Console } from '@angular/core/src/console';
import { Router, Routes, RouterModule } from '@angular/router';




@Component({
  templateUrl: 'logout.component.html',
   styleUrls: ['../../../scss/vendors/toastr/toastr.scss', '../../../../node_modules/spinkit/css/spinkit.css'],
  encapsulation: ViewEncapsulation.None
})
 
export class LogoutComponent implements OnInit {

  rootUrl: string;
  progress: number|boolean;
  isAactionBtn = false;
  v_url: string;

  User: UserCls;
  vuserFullName: string;
  currentUserId: number;


constructor(private http: HttpClient, private auth: AuthenticationService,private _router: Router) {

    this.rootUrl = auth.apiUrl;
  }

  ngOnInit (): void {
    localStorage.removeItem('certauthCurrentUser');
    this._router.navigateByUrl('/pages/login');
}


  pageLoad() {

    // // get current logged-in user data

        const currentUser = JSON.parse(localStorage.getItem('certauthCurrentUser'));
      //  if(! currentUser.accessToken)
      
        this.currentUserId = currentUser.userId;
        this.vuserFullName = currentUser.userName;

      this.http.get<UserCls>(this.rootUrl + '/users/' + this.currentUserId).subscribe(data => {
      // console.log(data);

      this.User = data;
         localStorage.removeItem('certauthCurrentUser');


    }, error => {
      console.log(JSON.stringify(error));
    });

    // // get current logged-in user data

  }




} // end of class


class UserCls {

  id: number;
  usertype: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  isactive: boolean;
  notes: string;
  roleid: number;
  rolename: string;
  fullname: string;

// lastotp
// lastotpdatetime
// otplogid: number;
// userpassword


}
