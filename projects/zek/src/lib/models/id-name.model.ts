export class IdName<TId = any, TName = any> {
    id?: TId | null;
    name?: TName | null;

    constructor(init?: Partial<IdName>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}

export class IdNameChecked<TId = any, TName = any> extends IdName<TId, TName> {
    checked?: boolean | null;
}