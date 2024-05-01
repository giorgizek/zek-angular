import { TimeHelper } from "./time-helper";

export class DateHelper {

    static minDate() {
        return new Date(0);
    };

    static equals(value1?: Date | null, value2?: Date | null) {
        let val1 = (value1 === undefined || value1 === null) ? null : value1;
        let val2 = (value2 === undefined || value2 === null) ? null : value2;


        if (val1 === val2) {
            return true;
        }

        if (!val1 || !val2) {
            return false;
        }

        return val1.getTime() === val2.getTime();
    }

    static getDates(start: Date, end: Date) {
        var dates = new Array<Date>();
        var date = new Date(start.valueOf());
        while (date <= end) {
            dates.push(new Date(date));
            date = this.addDays(date, 1);
        }
        return dates;
    }

    static dateOnly(value: Date) {
        let year = value.getFullYear();
        let month = value.getMonth();
        let day = value.getDate();
        let date = new Date(Date.UTC(year, month, day));

        return date;
    }

    static toISODateString(value: Date | string) {
        let date = this.parseDate(value);

        if (!date)
            return null;

        let year = date.getFullYear();
        // Add +1 to month since 0 is January
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let str = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        //str = year.toString() + "-" + (month + 1).toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0");
        return str;
    }

    //** Offes seconds ( offsetmin * 60sec * 1000ms) */
    private static readonly _utcDiff = -new Date().getTimezoneOffset() * 60000;
    static utcToLocal(utc: Date) {
        return new Date(utc.getTime() + this._utcDiff);
    }
    static localToUtc(utc: Date) {
        return new Date(utc.getTime() - this._utcDiff);
    }

    static addTime(value: Date, time: string | undefined | null) {
        let tmp = TimeHelper.parseTime(time);
        if (!tmp) return value;

        let timeDate = new Date('1970-01-01T' + time + 'Z');
        let date = value;
        date.setTime(date.getTime() + timeDate.getTime());
        return date;
    };
    static addYears(v: Date, years: number): Date {
        if (!years) return v;

        let date = v;
        date.setFullYear(v.getFullYear() + years);
        return date;
    }
    static addMonths(v: Date, months: number) {
        if (!months) return v;

        let date = v;
        date.setMonth(date.getMonth() + months);
        return date;
    };
    static addDays(v: Date, days: number) {
        if (!days) return v;

        let date = v;
        date.setDate(date.getDate() + days);
        return date;
    };
    static addHours(v: Date, hours: number) {
        if (!hours) return v;

        let date = new Date(v);
        //todo need to check if this line needs --> date = new Date(date.getTime());
        date.setHours(date.getHours() + hours);
        return date;
    }
    static addMinutes(v: Date, minutes: number) {
        if (!minutes) return v;

        let date = new Date(v);
        //todo need to check if this line needs --> date = new Date(date.getTime());
        date.setMinutes(date.getMinutes() + minutes);
        return date;
    }
    static addSeconds(v: Date, seconds: number) {
        if (!seconds) return v;

        let date = v;
        date.setSeconds(date.getSeconds() + seconds);

        return date;
    };
    static isToday(date: Date) {
        let today = new Date();
        return this.isSameDate(date, today);
    };
    static clone(date: Date) {
        return new Date(+date);
    };
    static isAnotherMonth(a: Date, b: Date) {
        return b && a.getMonth() !== b.getMonth();
    };
    static isWeekend(v: Date,): boolean {
        return v.getDay() === 0 || v.getDay() === 6;
    };
    static isSameDate(a: Date, b: Date) {
        return b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    };


    static getAge(value?: Date | string | null, now?: Date | null) {
        if (value === undefined || value === null || value === '' || value !== value) return null;

        const date = this.toDate(value);

        let nowTime = now ? now.getTime() : Date.now();
        let timeDiff = nowTime - date.getTime();

        return Math.floor((timeDiff / 86400000) / 365.25);//86400000 = (1000 * 60 * 60 * 24) = 1000 millisecond * 60second  * 60minute * 24hour
    };
    static subtractMonths(endDate: Date, starDate: Date) {
        let start = starDate <= endDate ? starDate : endDate;
        let end = starDate <= endDate ? endDate : starDate;
        let plus = starDate <= endDate ? 1 : -1;

        let months = (end.getFullYear() - start.getFullYear()) * 12;
        months -= start.getMonth();
        months += end.getMonth();
        return months * plus;
    };

    static subtractDays(value: Date, date: Date) {
        if (!date)
            return null;

        date = this.toDate(date);
        let timeDiff = date.getTime() - value.getTime();
        return Math.floor(timeDiff / 86400000);//86400000 = (1000 * 60 * 60 * 24) = 1000 millisecond * 60second  * 60minute * 24hour
    };
    static subtractHours(value: Date, date?: Date | null) {
        if (!date)
            return null;

        date = this.toDate(date);
        let timeDiff = date.getTime() - value.getTime();
        return Math.floor((timeDiff % 86400000) / 3600000);
    };
    static subtractMinutes(value: Date, date?: Date | null) {
        if (!date)
            return null;

        date = this.toDate(date);
        let timeDiff = date.getTime() - value.getTime();
        //
        return Math.floor(((timeDiff % 86400000) % 3600000) / 60000);
    };




    static ISO8601_DATE_REGEX =
        /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    //        1        2       3         4          5          6          7          8  9     10      11


    static parseDate(value: any): Date | null {
        if (typeof value === 'undefined' || value == null || value === '') return null;
        return this.toDate(value);
    }

    //  export function toDate(value: string|number|Date): Date this function is imported from date pipe 
    // packages/common/src/i18n/format_date.ts

    /***
     * Converts a value to date.
     *
     * Supported input formats:
     * - `Date`
     * - number: timestamp
     * - string: numeric (e.g. "1234"), ISO and date strings in a format supported by
     *   [Date.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse).
     *   Note: ISO strings without time return a date without timeoffset.
     *
     * Throws if unable to convert to a date.
     */
    static toDate(value: string | number | Date): Date {
        if (this.isDate(value)) {
            return value;
        }

        if (typeof value === 'number' && !isNaN(value)) {
            return new Date(value);
        }

        if (typeof value === 'string') {
            value = value.trim();

            const parsedNb = parseFloat(value);

            // any string that only contains numbers, like "1234" but not like "1234hello"
            if (!isNaN(value as any - parsedNb)) {
                return new Date(parsedNb);
            }

            if (/^(\d{4}-\d{1,2}-\d{1,2})$/.test(value)) {
                /* For ISO Strings without time the day, month and year must be extracted from the ISO String
                before Date creation to avoid time offset and errors in the new Date.
                If we only replace '-' with ',' in the ISO String ("2015,01,01"), and try to create a new
                date, some browsers (e.g. IE 9) will throw an invalid Date error.
                If we leave the '-' ("2015-01-01") and try to create a new Date("2015-01-01") the timeoffset
                is applied.
                Note: ISO months are 0 for January, 1 for February, ... */
                const [y, m, d] = value.split('-').map((val: string) => +val);
                return new Date(y, m - 1, d);
            }

            let match: RegExpMatchArray | null;
            if (match = value.match(this.ISO8601_DATE_REGEX)) {
                return this.isoStringToDate(match);
            }
        }

        const date = new Date(value as any);
        if (!this.isDate(date)) {
            throw new Error(`Unable to convert "${value}" into a date`);
        }
        return date;
    }

    /**
     * Converts a date in ISO8601 to a Date.
     * Used instead of `Date.parse` because of browser discrepancies.
     */
    static isoStringToDate(match: RegExpMatchArray): Date {
        const date = new Date(0);
        let tzHour = 0;
        let tzMin = 0;

        // match[8] means that the string contains "Z" (UTC) or a timezone like "+01:00" or "+0100"
        const dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear;
        const timeSetter = match[8] ? date.setUTCHours : date.setHours;

        // if there is a timezone defined like "+01:00" or "+0100"
        if (match[9]) {
            tzHour = Number(match[9] + match[10]);
            tzMin = Number(match[9] + match[11]);
        }
        dateSetter.call(date, Number(match[1]), Number(match[2]) - 1, Number(match[3]));
        const h = Number(match[4] || 0) - tzHour;
        const m = Number(match[5] || 0) - tzMin;
        const s = Number(match[6] || 0);
        const ms = Math.round(parseFloat('0.' + (match[7] || 0)) * 1000);
        timeSetter.call(date, h, m, s, ms);
        return date;
    }

    static isDate(value: any): value is Date {
        return value instanceof Date && !isNaN(value.valueOf());
    }
}