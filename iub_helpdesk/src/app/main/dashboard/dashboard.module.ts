import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {  RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@packages/services/auth/auth.guard';
import { MaterialModule } from '@packages/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';

const routes : Routes = [
  {path : '',component : DashboardComponent,canActivate : [AuthGuard]}
]

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
  ]
})
export class DashboardModule { }
