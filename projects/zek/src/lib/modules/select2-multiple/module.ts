  
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZekSelect2Multiple } from './select2-multiple';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ZekSelect2Multiple
  ],
  exports: [
    ZekSelect2Multiple
  ],
})

export class ZekSelect2MultipleModule {
}