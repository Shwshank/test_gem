import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentsComponent } from './parents.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Parent'
    },
    children: [
      {
        path: 'parents',
        component: ParentsComponent,
        data: {
          title: 'Parent'
        }
      }     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule {}
