import { Pipe, PipeTransform } from '@angular/core';
import { DateHelper } from '../../utils';

@Pipe({
    standalone: true,
    name: 'age'
})
export class AgePipe implements PipeTransform {
    transform(value: any, now?: any): number | null {
        if (typeof value === 'undefined' || value === null || value === '' || value !== value) return null;
        
        const date = DateHelper.toDate(value);

        let timeDiff = (now ? DateHelper.toDate(now).getTime() : Date.now()) - date.getTime();
        return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    }
}