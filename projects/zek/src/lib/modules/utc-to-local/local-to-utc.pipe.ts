import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { DateHelper } from '../../utils';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'localToUtc',
    pure: true
})
export class ZekLocalToUtcPipe implements PipeTransform {
    constructor(private readonly _datePipe: DatePipe) {
    }

    transform(value: Date | string | number | null | undefined, format?: string): string | null {
        if (typeof value === 'undefined' || value === null || value === '' || value !== value) return null;

        const date = DateHelper.localToUtc(DateHelper.toDate(value))
        return this._datePipe.transform(date, format);
    }
}
@NgModule({
    declarations: [ZekLocalToUtcPipe],
    exports: [ZekLocalToUtcPipe],
    providers: [DatePipe]
})
export class ZekLocalToUtcModule { }