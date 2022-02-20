import { KeyPair } from './key-pair.model';

export class Tree extends KeyPair<number, string> {
    parentId?: number | null;
    children?: Tree[] | null;
    childrenIds?: number[] | null;
}