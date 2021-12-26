import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPlatformLoginComponent } from './components/app-platform-login/app-platform-login.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@packages/material/material.module';



@NgModule({
    declarations: [AppPlatformLoginComponent],
    imports: [
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
        AppPlatformLoginComponent
    ]
})
export class AppPlatformLoginModule { }
