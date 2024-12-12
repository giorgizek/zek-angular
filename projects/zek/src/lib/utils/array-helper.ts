// import { KeyPair } from "../models/key-pair.model";
// import { Tree } from "../models/tree.model";

import { KeyPair, KeyPairEx, Tree } from "../models";
import { IFlattenTree, INode, ITreeNode } from "../models/tree";



export class ArrayHelper {
    static insert(array: any[], index: number, item: any) {
        array.splice(index, 0, item);
    }


    /**
     * Remove item from array
     * @param array 
     * @param item item to remove
     */
    static remove(array: any[], item: any) {
        const index = array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            array.splice(index, 1); // 2nd parameter means remove one item only
        }
    }


    /**
     * Remove all items from array
     * @param array 
     * @param item item to remove
     */
    static removeAll(array: any[], item: any) {
        var i = 0;
        while (i < array.length) {
            if (array[i] === item) {
                array.splice(i, 1);
            } else {
                ++i;
            }
        }
    }


    static move(array: any[], fromIndex: number, toIndex: number) {

        const item = array[fromIndex];
        array.splice(fromIndex, 1);//remove item frrom array
        array.splice(toIndex, 0, item);//insert item into array
        return array;
    }

    static contains(value: any[], v: any) {
        for (let i = 0; i < value.length; i++) {
            if (value[i] === v) return true;
        }
        return false;
    }


    static isArray(value: any) {
        return Array.isArray(value) && value.length > 0;
    }
    // static distinct(value: any[]) {
    //     var arr: any[] = [];
    //     for (var i = 0; i < value.length; i++) {
    //         let val = value[i];
    //         if (!this.contains(arr, val)) {
    //             arr.push(val);
    //         }
    //     }
    //     return arr;
    // }

    static distinct(array: any[]) {
        const length = array.length;
        const result = []
        const seen = new Set();

        for (let index = 0; index < length; index++) {
            const value = array[index];
            if (seen.has(value)) continue;

            seen.add(value);
            result.push(value);
        }

        return result;
    }

    static filterByKey(filterValue: any, key: string, array: any[]) {
        if (typeof filterValue === 'undefined' || filterValue == null || (typeof key === 'string' && key.length === 0))
            return array;

        return array.filter(x => x !== undefined && x !== null && x[key] === filterValue);
    }



    static flatten(array: any, indent: number = 0) {
        let result: any[] = [];
        if (!Array.isArray(array)) {
            const flattenedItem = {
                ...array, // shallow copy the current item
                indent, // add the current indent level
                count: Array.isArray(array.children) ? array.children.length : 0 // set count based on children
            };

            delete flattenedItem.children;
            delete flattenedItem.childrenIds;
            result.push(flattenedItem);

            if (flattenedItem.count) {
                result.push(...this.flatten(array.children, indent + 1)); // Use spread operator for efficiency
            }

            return result;
        } else {

            for (const item of array) {
                result.push(...this.flatten(item, indent));
            }
        }

        return result;
    }

    static flattenDropDownList(tree: Tree | Tree[], indent: number = 0) {
        let result: IFlattenTree[] = [];
        // If the input is an array of trees, we process each one
        if (!Array.isArray(tree)) {
            // Add the current tree node to the result
            let item = {
                key: tree.key,
                value: '&emsp;'.repeat(indent) + tree.value,
                indent: indent,
                count: Array.isArray(tree.children) ? tree.children.length : 0
            } as IFlattenTree;
            result.push(item);
            // If there are children, recursively flatten them
            if (Array.isArray(tree.children)) {
                result.push(...this.flattenDropDownList(tree.children, indent + 1)); // Use spread operator for efficiency
            }
        } else {
            for (const item of tree) {
                result.push(...this.flattenDropDownList(item, indent));
            }

        }

        return result;
    }



    private static enumToKeyPairBaseArray<T extends KeyPair<number, string>>(value: any): T[] {
        const keys = Object.keys(value);
        const slice = keys.length / 2;
        const result: T[] = [];
        // for (let i = 0; i < slice; i++) {
        //     result.push({ key: +keys[i], value: keys[i + slice] } as T);
        // }
        for (let i = slice; i < keys.length; i++) {
            const name = keys[i];
            result.push({ key: + value[name], value: name } as T);
        }
        return result;
        //return Array.from(keys.slice(keys.length / 2), x => { key:x, value:'aaa' } as Object);
    }
    static enumToKeyPairArray(value: any): KeyPair<number, string>[] {
        return this.enumToKeyPairBaseArray<KeyPair<number, string>>(value);
    }
    static enumToKeyPairExArray(value: any): KeyPairEx<number, string>[] {
        return this.enumToKeyPairBaseArray<KeyPairEx<number, string>>(value);
    }





    /**
     * Method to create a tree from a flat array of nodes
     * @param array 
     * @param safe if tue and some nodes not have parent thand adds as a root node. if false than thoose nodes skipped.
     * @returns 
     */
    static createTree(array: INode[], safe = true): ITreeNode[] {
        const tree: ITreeNode[] = [];

        // Map to store nodes by their id for easy access
        const map: { [key: number]: ITreeNode } = {};

        // Step 1: Loop over the array to build the nodes
        for (const item of array) {
            const node: ITreeNode = {
                id: item.id,
                parentId: item.parentId ?? null,
                name: item.name ?? null,
                children: null
            };
            map[node.id] = node;
        }

        for (const item of array) {
            const node = map[item.id];

            // Step 2: Check if it's a root or child and assign to parent or tree
            if (typeof node.parentId === 'undefined' || node.parentId === null) {
                // Root node, add directly to the tree
                tree.push(node);
            } else {
                // Non-root node, find its parent and add to its children
                let parentNode = map[node.parentId];
                if (parentNode) {
                    if (!Array.isArray(parentNode.children))
                        parentNode.children = [];
                    parentNode.children.push(node);
                } else if (safe) {
                    //if save=true and parent node not exists, then we add as a root node
                    tree.push(node);
                }
            }
        }

        return tree;
    }

}