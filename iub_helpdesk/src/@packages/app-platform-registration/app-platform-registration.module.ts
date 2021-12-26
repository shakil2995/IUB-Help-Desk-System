
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';
import { AppPlatformRegistrationComponent } from './components/app-platform-registration/app-platform-registration.component';
import { MatProgressBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@packages/material/material.module';


@NgModule({
    declarations: [
      AppPlatformRegistrationComponent
    ],
    imports     : [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule
    ],
    exports: [
        AppPlatformRegistrationComponent
    ]
})
export class AppPlatformRegistrationModule{}
