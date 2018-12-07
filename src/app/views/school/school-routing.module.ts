import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolsComponent } from './schools.component';
import { StudentsComponent } from './students.component';
import { CheckupComponent } from './checkup.component';
import { StudentsCheckupComponent} from './students-checkup.component'; 
import { BillingComponent} from './billing.component'; 

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'School'
    },
    children: [
      {
        path: 'schools',
        component: SchoolsComponent,
        data: {
          title: 'School Master'
        }
      },

      {
        path: 'students',
        component: StudentsComponent,
        data: {
          title: 'Student Master'
        }
      }
      ,

      {
        path: 'checkup',
        component: CheckupComponent,
        data: {
          title: 'Check-up'
        }
      },
      {
        path: 'students-checkup',
        component: StudentsCheckupComponent,
        data: {
          title: 'Student Check-up'
        }
      },
      {
        path: 'billing',
        component: BillingComponent,
        data: {
          title: 'School Billing'
        }
      }

     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule {}
