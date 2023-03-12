  
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZekSelectMultiple } from './select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ZekSelectMultiple
  ],
  exports: [
    ZekSelectMultiple
  ],
})

export class ZekSelectModule {
}