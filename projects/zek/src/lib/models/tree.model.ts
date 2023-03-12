import { KeyPair } from './key-pair.model';

export class Tree extends KeyPair<number, string> {
    parentId?: number | null;
    children?: Tree[] | null;
    childrenCount?: number | null;
    indent?: number | null;
    childrenIds?: number[] | null;
}