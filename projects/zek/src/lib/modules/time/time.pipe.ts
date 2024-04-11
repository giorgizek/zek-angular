import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
//import { toDate } from '../../extensions';

@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {
    constructor(private readonly _datePipe: DatePipe) {
    }

    transform(value: Date | string | number | null | undefined, format?: string): string | null {
        if (value === undefined || value === null || value === '' || value !== value) return null;

        const dateTime: Date = new Date(value);
        let dateTimeString: string;
        if (this.isValidDate(dateTime)) {
            dateTimeString = dateTime.toString();
        } else {
            dateTimeString = `1970-01-01 ${value}`;
        }

        // Replace any dashes with slashes, as Safari and IE11 don't recognise dates with dashes in them.
        dateTimeString = dateTimeString.replace(/-/g, '/');
        if (!this.isValidDate(new Date(dateTimeString))) {
            return null;
        }

        const formattedTime = this._datePipe.transform(dateTimeString, format);
        return formattedTime;
    }


    private isValidDate(d: any): boolean {
        return d instanceof Date && !isNaN(d.getTime());
    }
}
/*export class TimePipe extends DatePipe implements PipeTransform {
    transform(value: Date | string | number, format?: string, timezone?: string, locale?: string): string | null;
    transform(value: null | undefined, format?: string, timezone?: string, locale?: string): null;
    transform(value: Date | string | number | null | undefined, format?: string, timezone?: string, locale?: string): string | null {
        if (value === undefined || value === null || value === '' || value !== value) return null;

        const dateTime: Date = new Date(value);

        //const date = toDate(value);
        let dateTimeString: string;
        if (this.isValidDate(dateTime)) {
            dateTimeString = dateTime.toString();
        } else {
            dateTimeString = `1970-01-01 ${value}`;
        }

        dateTimeString = dateTimeString.replace(/-/g, '/');

        if (!this.isValidDate(new Date(dateTimeString))) {
            return null;
        }

        const formattedTime = super.transform(dateTimeString, format);

        return formattedTime;
    }


    private isValidDate(d: any): boolean {
        return d instanceof Date && !isNaN(d.getTime());
    }
}*/