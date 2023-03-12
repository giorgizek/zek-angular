import { OverlapHelper } from "./overlap-helper";

export class TimeHelper {
    static parseTime(value: any): string | null {
        if (typeof value === 'undefined' || value == null || value === '') return null;
        return this.toTime(value);
    }
    static toTime(value: string): string {
        if (typeof value === 'string') {
            value = value.trim();

            if (/^(\d{1,2}:\d{1,2})$/.test(value)) {
                const [h, m] = value.split(':').map((val: string) => +val);
                return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:00`;
            } else if (/^(\d{1,2}:\d{1,2}:\d{1,2})$/.test(value)) {
                const [h, m, s] = value.split(':').map((val: string) => +val);
                return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
            }
        }
        return '';
    }


    static toDate(time: string | undefined | null): Date {
        let date = new Date(0);

        let tmp = this.parseTime(time);
        if (!tmp) return date;

        let timeDate = new Date('1970-01-01T' + time + 'Z');
        date.setTime(date.getTime() + timeDate.getTime());
        return date;
    };


    static intersects(start1: string, end1: string, start2: string, end2: string): boolean {
        let startDate1 = this.toDate(start1);
        let endDate1 = this.toDate(end1);
        let startDate2 = this.toDate(start2);
        let endDate2 = this.toDate(end2);

        return OverlapHelper.intersects(startDate1, endDate1, startDate2, endDate2);
    }

    static overlaps(start1: string, end1: string, start2: string, end2: string): boolean {
        let startDate1 = this.toDate(start1);
        let endDate1 = this.toDate(end1);
        let startDate2 = this.toDate(start2);
        let endDate2 = this.toDate(end2);

        return OverlapHelper.overlaps(startDate1, endDate1, startDate2, endDate2);
    }
}