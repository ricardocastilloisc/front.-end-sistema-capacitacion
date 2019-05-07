import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { InicioComponent } from 'app/main/inicio/inicio.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'inicio',      component: InicioComponent },
    { path: 'dashboard',      component: HomeComponent },
    
];
