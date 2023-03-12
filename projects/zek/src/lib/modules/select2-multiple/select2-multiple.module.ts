  
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select2MultipleComponent } from './select2-multiple.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    Select2MultipleComponent
  ],
  exports: [
    Select2MultipleComponent
  ],
})

export class Select2MultipleModule {
}