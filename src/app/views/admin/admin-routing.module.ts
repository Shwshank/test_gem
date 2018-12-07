import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    // // data: {
    // //   title: 'Admin'
    // // },
    children: [
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Admin'
        }
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
