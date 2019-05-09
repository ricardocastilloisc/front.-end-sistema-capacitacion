import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { HomeComponent } from '../../home/home.component';
import { InicioComponent } from '../../main/inicio/inicio.component';
import { ListarADGComponent } from '../../main/listar-adg/listar-adg.component';

import {
  MatButtonModule,
  MatIconModule,
  MatPaginatorModule,
  MatTableModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatMenuModule,
  MatProgressBarModule,
  MatDialogModule,
  MatInputModule,
  MatDatepickerModule,
  MatSelectModule,
  MatCheckboxModule,
  MatFormFieldModule
} from "@angular/material";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    MatIconModule,
    MatTableModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  declarations: [
    HomeComponent,
    InicioComponent,
    ListarADGComponent,
  ]
})

export class AdminLayoutModule {}
