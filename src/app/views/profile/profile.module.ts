import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { NgSpinKitModule } from 'ng-spin-kit';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// Notifications
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

// ladda
import { LaddaModule } from 'angular2-ladda';

import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    ProfileRoutingModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
    ToasterModule,
    NgSpinKitModule,
    LaddaModule,
  ],
  declarations: [


  ]
})
export class ProfileModule { }
