import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@packages/material/material.module';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutocompleteComponent } from './component/autocomplete/autocomplete.component';



@NgModule({
  declarations: [AutocompleteComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents : [],
  exports: [
    AutocompleteComponent
  ]
})
export class AutoCompleteModule { }
