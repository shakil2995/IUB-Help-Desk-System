import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPackageDatatableComponent } from './components/app-package-datatable/app-package-datatable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { NgxPrintModule } from 'ngx-print';
import { MaterialModule } from '@packages/material/material.module';




@NgModule({
  declarations: [AppPackageDatatableComponent],
  entryComponents: [AppPackageDatatableComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexModule,
    NgxPrintModule,
    ReactiveFormsModule,
  ],
  exports: [
    AppPackageDatatableComponent
  ]
})
export class AppPackageDatatableModule { }
