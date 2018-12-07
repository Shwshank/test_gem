import { Component } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { fail } from 'assert';
import { DataService } from "./../../services/data.services";
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster'; // rrc

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss',
    '../../../../node_modules/spinkit/css/spinkit.css'], // rrc
})

export class LoginComponent {

  private toasterService: ToasterService; // rrc
  public toasterconfig: ToasterConfig = new ToasterConfig({ tapToDismiss: true, timeout: 5000 }); // rrc

  spinnerCubeDisplay = false;//defining variable for spinner

  constructor(private dataService: DataService, private auth: AuthenticationService, private router: Router, private http: HttpClient, toasterService: ToasterService) {

  }



} // end of class

