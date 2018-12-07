import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { NgSpinKitModule } from 'ng-spin-kit';

import {CalendarModule} from 'primeng/primeng';
//dateValue accessor
import { DateValueAccessorModule } from 'angular-date-value-accessor';
// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//slider
import {SliderModule} from 'primeng/primeng';
// Notifications
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
// Tabs Module
import { TabsModule } from 'ngx-bootstrap/tabs';

//ladda
import { LaddaModule } from 'angular2-ladda';
//ng select
import {NgSelectModule} from '@ng-select/ng-select';

import { SchoolsComponent } from './schools.component';
import { StudentsComponent } from './students.component';
import { StudentsCheckupComponent} from './students-checkup.component';
import { BillingComponent} from './billing.component';
import { SchoolRoutingModule } from './school-routing.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// //ChartModule
// import { ChartsModule } from 'ng2-charts/ng2-charts';
//primeng chart
import {ChartModule} from 'primeng/primeng';

import { CheckupComponent } from './checkup.component';
import { NumericTextBoxModule } from '@syncfusion/ej2-ng-inputs';
// import { DatePickerModule } from '@syncfusion/ej2-ng-calendars';
import {CheckboxModule} from 'primeng/primeng';
import {ToggleButtonModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {RatingModule} from 'primeng/primeng';
// import { fr } from 'ngx-bootstrap/bs-moment/i18n/fr';

@NgModule({
  imports: [
    SchoolRoutingModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
    ToasterModule,
    NgSpinKitModule,
    LaddaModule,
    SliderModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule.forRoot({notFoundText: 'Your custom not found text', typeToSearchText: 'Your custom type to search text'}),
    CheckboxModule,
    ToggleButtonModule,
    DropdownModule,
    RatingModule,
    NumericTextBoxModule,
    ChartModule,
    CalendarModule,
    NgbModule
   

  ],
  declarations: [
    SchoolsComponent,
    StudentsComponent,
    StudentsCheckupComponent,
    CheckupComponent,
    BillingComponent
  ]
})
export class SchoolModule { }
