export class BitwiseHelper {
    static HasFlag(flags: number, flagToCheck: any): boolean {
        return (flags & flagToCheck) === flagToCheck;
    }

    static AddFlags(flags: number, ...flagsToAdd: any[]): number {
        if (!flagsToAdd) return flags;

        flagsToAdd.forEach(flag => {
            flags |= flag;
        });

        return flags;
    }
}