import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppPackageTableComponent } from './components/app-package-table/app-package-table.component';



@NgModule({
    declarations: [AppPackageTableComponent],
    imports: [
        CommonModule,
        NgxDatatableModule
    ],
    exports: [
        AppPackageTableComponent
    ]
})
export class AppPackageTableModule { }
