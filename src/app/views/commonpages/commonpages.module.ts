import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { NgSpinKitModule } from 'ng-spin-kit';

import { CalendarModule } from 'primeng/primeng';
//dateValue accessor
import { DateValueAccessorModule } from 'angular-date-value-accessor';
// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap';

// Angular 2 Input Mask
import { TextMaskModule } from 'angular2-text-mask';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//slider
import { SliderModule } from 'primeng/primeng';
// Notifications
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
//ladda
import { LaddaModule } from 'angular2-ladda';
//ng select
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'primeng/primeng'

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CommanPagesRoutingModule } from './commonpages-routing.module';



@NgModule({
  imports: [
    CommanPagesRoutingModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
    ToasterModule,
    NgSpinKitModule,
    TabsModule,
    LaddaModule,
    //   LaddaModule.forRoot({
    //     style: "contract",
    //     spinnerSize: 40,
    //     spinnerColor: "red",
    //     spinnerLines: 12
    // }),
    FileUploadModule,
    SliderModule,
    NgSelectModule,
    TextMaskModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule.forRoot({ notFoundText: 'Your custom not found text', typeToSearchText: 'Your custom type to search text' }),
    CalendarModule,
    NgbModule


  ],
  declarations: [

  ]
})

export class CommonPagesModule { }
