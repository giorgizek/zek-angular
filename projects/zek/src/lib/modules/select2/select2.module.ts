  
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select2Component } from './select2.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    Select2Component
  ],
  exports: [
    Select2Component
  ],
})

export class Select2Module {
}