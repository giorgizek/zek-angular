import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ZekProgress } from './progress';

@NgModule({
  imports:[
    CommonModule,
    TranslateModule
  ],
  declarations: [
      ZekProgress,
    ],
  exports: [ZekProgress]
})
export class ProgressModule { }