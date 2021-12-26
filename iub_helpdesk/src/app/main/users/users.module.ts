import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeEntryComponent } from './employee-entry/employee-entry.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ClientEntryComponent } from './client-entry/client-entry.component';
import { ClientListComponent } from './client-list/client-list.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@packages/material/material.module';
import { AuthGuard } from '@packages/services/auth/auth.guard';
import { NgxPrintModule } from 'ngx-print';
import { DateAdapter, MatSortModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

const routes : Routes = [
  {path : 'student-entry',component : ClientEntryComponent, canActivate : [AuthGuard]},
  {path : 'student-update/:id',component : ClientEntryComponent, canActivate : [AuthGuard]},
  {path : 'student-list',component : ClientListComponent,canActivate : [AuthGuard]},
  {path : 'employee-entry',component : EmployeeEntryComponent,canActivate : [AuthGuard]},
  {path : 'employee-entry/:id',component : EmployeeEntryComponent,canActivate : [AuthGuard]},
  {path : 'employee-list',component : EmployeeListComponent,canActivate : [AuthGuard]},
]
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}
@NgModule({
  declarations: [EmployeeEntryComponent, EmployeeListComponent,ClientEntryComponent, ClientListComponent],
  imports: [
    CommonModule,
    FuseSharedModule,
    MaterialModule,
    MatSortModule,
    NgxPrintModule,
    RouterModule.forChild(routes)
  ],
  providers :[ {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps:  [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class UsersModule { }
