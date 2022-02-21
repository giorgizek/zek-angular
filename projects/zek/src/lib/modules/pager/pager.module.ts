import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PagerComponent } from './pager/pager.component';

@NgModule({
  imports:[
    CommonModule,
    TranslateModule
  ],
  declarations: [
      PagerComponent,
    ],
  exports: [PagerComponent]
})
export class PagerModule { }