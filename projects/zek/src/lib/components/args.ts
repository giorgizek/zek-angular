export interface CancelArgs {
    // /**
    //  *
    //  */
    // constructor(oldValue: any, newValue: any, cancel = false) {
    //     this.oldValue = oldValue;
    //     this.newValue = newValue;
    //     this.cancel = cancel;
    // }

    newValue: any;

    oldValue: any;

    cancel?: boolean | null;
}