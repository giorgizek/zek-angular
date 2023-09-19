  
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZekSelect2 } from './select2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ZekSelect2
  ],
  exports: [
    ZekSelect2
  ],
})

export class Select2Module {
}