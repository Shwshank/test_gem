import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//Pagination
import { NgxPaginationModule } from 'ngx-pagination';
//spinner
import { NgSpinKitModule } from 'ng-spin-kit';
// Notifications
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
//ladda
import { LaddaModule } from 'angular2-ladda';


import { ParentsComponent } from './parents.component';

import { ParentRoutingModule } from './parent-routing.module';


@NgModule({
  imports: [
    ParentRoutingModule,
    CommonModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
    ToasterModule,
    NgSpinKitModule,
    LaddaModule,
  ],
  declarations: [
    ParentsComponent,
  ]
})
export class ParentModule { }
