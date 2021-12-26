import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@packages/material/material.module';
import { NgxPrintModule } from 'ngx-print';
import { AuthGuard } from '@packages/services/auth/auth.guard';



import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatAutocompleteModule} from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { TicketDialogComponent } from './ticket-dialog/ticket-dialog.component';
import { AutoCompleteModule } from '@packages/app-package-autocomplete/auto-complete.module';

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

const routes: Routes = [
  {path : '',redirectTo : 'ticket-list'},
  {path : 'ticket-entry',component : TicketDialogComponent, canActivate : [AuthGuard]},
  {path : 'ticket-list',component : TicketListComponent, canActivate : [AuthGuard]},
]

@NgModule({
  declarations: [TicketCreateComponent, TicketListComponent, TicketDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    MaterialModule,
    NgxPrintModule,
    AutoCompleteModule
  ],
  providers :[ {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps:  [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  entryComponents : [TicketCreateComponent]
})
export class TicketsModule { }
