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
//ng select
import { NgSelectModule } from '@ng-select/ng-select';
//for progressbar
import { ProgressBarModule } from 'primeng/primeng';
//ladda
import { LaddaModule } from 'angular2-ladda';

//components
import { UsersComponent } from './users.component';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
    imports: [
        AdminRoutingModule,
        CommonModule,
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        NgxPaginationModule,
        FormsModule,
        ToasterModule,
        NgSpinKitModule,
        LaddaModule,
        ProgressBarModule,
        NgSelectModule,
        NgSelectModule.forRoot({ notFoundText: 'Your custom not found text', typeToSearchText: 'Your custom type to search text' }),
    ],
    declarations: [
        UsersComponent,

    ]
})
export class AdminModule { }
