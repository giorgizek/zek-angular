import { Pipe, PipeTransform } from '@angular/core';
import { DateHelper } from '../../utils';
import { DatePipe } from '@angular/common';

@Pipe({
    standalone: true,
    name: 'utcToLocal',
    pure: true
})
export class UtcToLocalPipe implements PipeTransform {
    constructor(private readonly _datePipe: DatePipe) {
    }

    transform(value: Date | string | number | null | undefined, format?: string): string | null {
        if (typeof value === 'undefined' || value === null || value === '' || value !== value) return null;

        const date = DateHelper.utcToLocal(DateHelper.toDate(value))
        return this._datePipe.transform(date, format);
    }
}