import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'callback',
    pure: false//this pure need because we are changing filter model and pure=false is handling
})
export class CallbackPipe implements PipeTransform {
    transform(items: any[], callback: (item: any, filter?: any) => boolean, filter?: any): any {
        if (!items || !callback) {
            return items;
        }

        return filter
            ? items.filter(item => callback(item, filter))
            : items.filter(item => callback(item));
    }
}