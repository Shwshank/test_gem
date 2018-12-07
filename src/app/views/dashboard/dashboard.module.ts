import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


import { AdminDashboardComponent } from './admindashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';  // rrc
import { WidgetsComponent } from './widgets.component'; // rrc test

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ToasterModule // rrc
  ],
  declarations: [AdminDashboardComponent,
    WidgetsComponent]
})
export class DashboardModule { }
