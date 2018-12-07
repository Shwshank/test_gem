import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//for progressbar
import {ProgressBarModule} from 'primeng/primeng';
//ladda
import { LaddaModule } from 'angular2-ladda';
import { CommonModule } from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; // rrc
// Notifications
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster'; // rrc
import { NgSpinKitModule } from 'ng-spin-kit'; // rrc spin cube

import { AgmCoreModule } from '@agm/core';
import { P401Component } from './401.component';
import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { RegisterComponent } from './register.component';
import { IndexComponent } from './index.component';
import { PagesRoutingModule } from './pages-routing.module';




@NgModule({
  imports: [ 
    PagesRoutingModule,
     FormsModule,
    CommonModule,
    NgSpinKitModule,
    ToasterModule,
    ProgressBarModule,
    LaddaModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAt7J81G8oH14yD_IrUby5iM8kbkFL1IpE'
    })
   ],
   providers: [

  ],
  declarations: [
    P404Component,
    P401Component,
    P500Component,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    IndexComponent
  ]
})
export class PagesModule { }
