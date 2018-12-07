
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './views/pages/index.component'
// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';
//import { AuthGuard } from 'app/guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'admin',
        loadChildren: './views/admin/admin.module#AdminModule'
      },

      {
        path: 'profile',
        loadChildren: './views/profile/profile.module#ProfileModule'
      },
      {
        path: 'commonpages',
        loadChildren: './views/commonpages/commonpages.module#CommonPagesModule'
      },
      {
        path: 'school',
        loadChildren: './views/school/school.module#SchoolModule'
      },
      {
        path: 'parent',
        loadChildren: './views/parent/parent.module#ParentModule'
      },
      {
        path: 'components',
        loadChildren: './views/components/components.module#ComponentsModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'forms',
        loadChildren: './views/forms/forms.module#FormsModule',
        //canActivate: [AuthGuard]
      },
      {
        path: 'editors',
        loadChildren: './views/editors/editors.module#EditorsModule'
      },
      {
        path: 'plugins',
        loadChildren: './views/plugins/plugins.module#PluginsModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'google-maps',
        loadChildren: './views/google-maps/google-maps.module#GoogleMapsModule'
      },
      {
        path: 'uikits',
        loadChildren: './views/uikits/uikits.module#UIKitsModule'
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
