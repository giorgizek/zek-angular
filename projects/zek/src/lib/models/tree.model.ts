import { KeyPairChecked } from './key-pair.model';

/**
 * @deprecated use ITreeNode
 */
export class Tree extends KeyPairChecked<number, string> {
    parentId?: number | null;
    children?: Tree[] | null;
    childrenCount?: number | null;
    indent?: number | null;
    childrenIds?: number[] | null;
}