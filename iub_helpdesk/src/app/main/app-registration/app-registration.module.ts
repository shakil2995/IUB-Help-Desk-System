import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRegistrationComponent } from './components/app-registration/app-registration.component';
import { AppPlatformRegistrationModule } from '@packages/app-platform-registration/app-platform-registration.module';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: AppRegistrationComponent
    }
];

@NgModule({
    declarations: [AppRegistrationComponent],
    imports: [
        CommonModule,
        AppPlatformRegistrationModule,
        RouterModule.forChild(routes)
    ]
})
export class AppRegistrationModule { }
