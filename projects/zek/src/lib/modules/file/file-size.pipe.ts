import { Pipe, PipeTransform } from '@angular/core';

/*
 * Convert bytes into largest possible unit.
 * Takes an precision argument that defaults to 2.
 * Usage:
 *   bytes | fileSize:precision
 * Example:
 *   {{ 1024 |  fileSize}}
 *   formats to: 1 KB
*/
@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {

    private units = [
        'bytes',
        'kB',
        'MB',
        'GB',
        'TB',
        'PB',
        'EB',
        'ZB',
        'YB'
    ];

    transform(bytes: number | null | undefined = 0, precision: number | null | undefined = 0): string {
        if (bytes == null || bytes == undefined)
            bytes = 0;
        if (precision == null || precision == undefined)
            precision = 0;

        if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return '?';

        let unit = 0;

        while (bytes >= 1024) {
            bytes /= 1024;
            unit++;
        }

        return bytes.toFixed(+ precision) + ' ' + this.units[unit];
    }
}