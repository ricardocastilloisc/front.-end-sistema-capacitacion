import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { InicioComponent } from 'app/main/inicio/inicio.component';
import { AuthGuardService } from '../../services/auth-guard.service';


export const AdminLayoutRoutes: Routes = [
    { path: 'inicio',      component: InicioComponent },
    { path: 'dashboard',      component: HomeComponent, canActivate: [AuthGuardService] },
  
    
];
