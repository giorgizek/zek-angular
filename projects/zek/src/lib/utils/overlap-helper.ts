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

export class OverlapHelper {


    static getRelation(start1: Date, end1: Date, start2: Date, end2: Date): PeriodRelation {
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
        if (this.hasInside2(start1, end1, start2, end2)) {
            if (start2 == start1) {
                return PeriodRelation.EnclosingStartTouching;
            }
            return end2 == end1 ? PeriodRelation.EnclosingEndTouching : PeriodRelation.Enclosing;
        }
        let periodContainsMyStart = this.hasInside(start2, end2, start1);
        let periodContainsMyEnd = this.hasInside(start2, end2, end1);
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

    static hasInside(start: Date, end: Date, date: Date): boolean {
        return date >= start && date <= end;
    }

    static hasInside2(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
        return this.hasInside(start1, end1, start2) && this.hasInside(start1, end1, end2);
    }

    static intersects(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
        return this.hasInside(start1, end1, start2) || this.hasInside(start1, end1, end2) || (start2 < start1 && end2 > end1);
    }

    static overlaps(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
        var relation = this.getRelation(start1, end1, start2, end2);
        return relation != PeriodRelation.After &&
            relation != PeriodRelation.StartTouching &&
            relation != PeriodRelation.EndTouching &&
            relation != PeriodRelation.Before;
    }


}