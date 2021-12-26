import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleManagementComponent } from './role-management/role-management.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@packages/services/auth/auth.guard';
import { MaterialModule } from '@packages/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { UserManagementComponent } from './user-management/user-management.component';


const routes:Routes = [
  {path : 'role_management',component : RoleManagementComponent, canActivate : [AuthGuard]},
  {path : 'user_management',component : UserManagementComponent, canActivate : [AuthGuard]},
]


@NgModule({
  declarations: [RoleManagementComponent, UserManagementComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    RouterModule.forChild(routes),
  ]
})
export class AdministrationModule { }
