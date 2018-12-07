import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admindashboard.component';

import { WidgetsComponent } from './widgets.component';


const routes: Routes = [
  {
    path: '',
    // data: {
    //   title: 'Dashboard'
    // },
    children: [
      {
        path: 'admindashboard',
        component: AdminDashboardComponent,
        data: {
          title: 'Admin Dashboard'
        }
      },
      {
        path: 'widgetsdashboard',
        component: WidgetsComponent,
        data: {
          title: 'Widgets Dashboard'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
