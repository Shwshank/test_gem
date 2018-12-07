import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Calendar
import { CalendarModule } from 'angular-calendar';
// Notifications
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';
// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSpinKitModule } from 'ng-spin-kit';
//ladda
import { LaddaModule } from 'angular2-ladda';
import { AgmCoreModule } from '@agm/core';


import { MapViewerRoutingModule } from './map-viewer-routing.module';

// rrc 07 Jun 2018

//ng select
import { NgSelectModule } from '@ng-select/ng-select';

// rrc 07 Jun 2018

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    ToasterModule,
    LaddaModule,
    NgSelectModule, // rrc 07 Jun 2018
    NgSpinKitModule,
    BsDatepickerModule.forRoot(),
    CalendarModule,
    CalendarModule.forRoot(),
    MapViewerRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAt7J81G8oH14yD_IrUby5iM8kbkFL1IpE'
      // To use the Google Maps JavaScript API, you must register your app project on the Google API Console and get a Google API key which you can add to your app
    })
  ],
  providers: [],
  declarations: [],
  bootstrap: []
})
export class MapViewerModule { }
