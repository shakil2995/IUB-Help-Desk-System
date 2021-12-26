import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLoginComponent } from './components/app-login/app-login.component';
import { AppPlatformLoginModule } from '@packages/app-platform-login/app-platform-login.module';
import { Routes, RouterModule } from '@angular/router';
import { LoginRightOpenComponent } from './components/login-right-open/login-right-open.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@packages/material/material.module';
import { Login2Component } from './components/login2/login-2.component';


const routes: Routes = [

    {
        path: 'login2',
        component:  Login2Component 
    },
    {
        path: '',
        component: AppLoginComponent
    },
    {
        path: 'login3',
        component: LoginRightOpenComponent
    },
   
];

@NgModule({
    declarations: [AppLoginComponent, LoginRightOpenComponent, Login2Component],
    imports: [
        CommonModule,
        AppPlatformLoginModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        RouterModule.forChild(routes)
    ]
})
export class LoginModule { }
