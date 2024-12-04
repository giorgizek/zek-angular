export interface IFlattenTree<TKey = any, TValue = any> {
    key?: TKey | null;
    value?: TValue | null;
    indent: number;
    count: number;
}
