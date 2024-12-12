export interface IFlattenTree<TKey = any, TValue = any> {
    key?: TKey | null;
    value?: TValue | null;
    indent: number;
    count: number;
}




export interface INode {
    id: number;
    parentId?: number | null;
    name: string | null;
}
export interface ITreeNode extends INode {
    children: ITreeNode[] | null;
}