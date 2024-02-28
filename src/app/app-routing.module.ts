import { HomeComponent } from './components/home/home.component';
import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];


export class AppRoutingModule { }

