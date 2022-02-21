export enum PeriodRelation {
    After,
    StartTouching,
    StartInside,
    InsideStartTouching,
    EnclosingStartTouching,
    Enclosing,
    EnclosingEndTouching,
    ExactMatch,
    Inside,
    InsideEndTouching,
    EndInside,
    EndTouching,
    Before,
}

export class DateHelper {



    static minDate() {
        return new Date(0);
    };

    static equals(date1?: Date | null, date2?: Date | null) {
        let val1 = (date1 === undefined || date1 === null) ? null : date1;
        let val2 = (date2 === undefined || date2 === null) ? null : date2;


        if (val1 === val2) {
            return true;
        }

        if (!val1 || !val2) {
            return false;
        }

        return val1.getTime() === val2.getTime();
    }

    static toISODateString(date: Date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let str = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        return str;
    }




    static addYears(v: Date, years: number): Date {
        if (!years) return v;

        let date = v;
        date.setFullYear(v.getFullYear() + years);
        return date;
    }
    static addDays(v: Date, days: number) {
        if (!days) return v;

        let date = v;
        date.setDate(date.getDate() + days);
        return date;
    };
    static addMinutes(v: Date, minutes: number) {
        if (!minutes) return v;

        let date = v;
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
    static isToday(v: Date) {
        let today = new Date();
        return this.isSameDate(v, today);
    };
    static clone(v: Date) {
        return new Date(+v);
    };
    static isAnotherMonth(v: Date, date: Date) {
        return date && v.getMonth() !== date.getMonth();
    };
    static isWeekend(v: Date,): boolean {
        return v.getDay() === 0 || v.getDay() === 6;
    };
    static isSameDate(a: Date, b: Date) {
        return b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    };


    static getAge(v: Date, now?: Date | null) {
        if (!now)
            now = new Date();
        let timeDiff = now.getTime() - v.getTime();
        return Math.floor((timeDiff / 86400000) / 365.25);//86400000 = (1000 * 60 * 60 * 24) = 1000 millisecond * 60second  * 60minute * 24hour
    };
    static subtractDays(v: Date, date?: Date | null) {
        if (!date)
            return null;

        date = this.toDate(date);
        let timeDiff = date.getTime() - v.getTime();
        return Math.floor(timeDiff / 86400000);//86400000 = (1000 * 60 * 60 * 24) = 1000 millisecond * 60second  * 60minute * 24hour
    };
    static subtractMinutes(v: Date, date?: Date | null) {
        if (!date)
            return null;

        date = this.toDate(date);
        let timeDiff = date.getTime() - v.getTime();
        return Math.floor(((timeDiff % 86400000) % 3600000) / 60000);;
    };



    




    static GetRelation(start1: Date, end1: Date, start2: Date, end2: Date): PeriodRelation {
        if (end2 < start1) {
            return PeriodRelation.After;
        }
        if (start2 > end1) {
            return PeriodRelation.Before;
        }
        if (start2 == start1 && end2 == end1) {
            return PeriodRelation.ExactMatch;
        }
        if (end2 == start1) {
            return PeriodRelation.StartTouching;
        }
        if (start2 == end1) {
            return PeriodRelation.EndTouching;
        }
        if (this.HasInside2(start1, end1, start2, end2)) {
            if (start2 == start1) {
                return PeriodRelation.EnclosingStartTouching;
            }
            return end2 == end1 ? PeriodRelation.EnclosingEndTouching : PeriodRelation.Enclosing;
        }
        let periodContainsMyStart = this.HasInside(start2, end2, start1);
        let periodContainsMyEnd = this.HasInside(start2, end2, end1);
        if (periodContainsMyStart && periodContainsMyEnd) {
            if (start2 == start1) {
                return PeriodRelation.InsideStartTouching;
            }
            return end2 == end1 ? PeriodRelation.InsideEndTouching : PeriodRelation.Inside;
        }
        if (periodContainsMyStart) {
            return PeriodRelation.StartInside;
        }
        if (periodContainsMyEnd) {
            return PeriodRelation.EndInside;
        }

        throw new Error("invalid period relation of '" + start1 + "-" + end1 + "' and '" + start2 + "-" + end2 + "'");
    }

    static HasInside(start: Date, end: Date, date: Date): boolean {
        return date >= start && date <= end;
    }

    static HasInside2(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
        return this.HasInside(start1, end1, start2) && this.HasInside(start1, end1, end2);
    }

    static Intersects(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
        return this.HasInside(start1, end1, start2) || this.HasInside(start1, end1, end2) || (start2 < start1 && end2 > end1);
    }

    static Overlaps(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
        var relation = this.GetRelation(start1, end1, start2, end2);
        return relation != PeriodRelation.After &&
            relation != PeriodRelation.StartTouching &&
            relation != PeriodRelation.EndTouching &&
            relation != PeriodRelation.Before;
    }









    static ISO8601_DATE_REGEX =
        /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    //        1        2       3         4          5          6          7          8  9     10      11


    static parseDate(value: any): Date | null {
        if (value == null || value === undefined || value === '') return null;
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