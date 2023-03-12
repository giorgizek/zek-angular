import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ZekPager } from './pager/pager.component';

@NgModule({
  imports:[
    CommonModule,
    TranslateModule
  ],
  declarations: [
      ZekPager,
    ],
  exports: [ZekPager]
})
export class ZekPagerModule { }