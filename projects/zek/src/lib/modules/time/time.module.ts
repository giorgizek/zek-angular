import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TimePipe } from './time.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TimePipe,
    ],
    providers: [
        DatePipe
    ],
    exports: [TimePipe]
})
export class TimeModule { }