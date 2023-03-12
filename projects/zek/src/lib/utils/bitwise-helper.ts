export class BitwiseHelper {
    static hasFlag(flags: number, flagToCheck: any): boolean {
        return (flags & flagToCheck) === flagToCheck;
    }

    static addFlags(flags: number, ...flagsToAdd: any[]): number {
        if (!flagsToAdd) return flags;

        flagsToAdd.forEach(flag => {
            flags |= flag;
        });

        return flags;
    }
}