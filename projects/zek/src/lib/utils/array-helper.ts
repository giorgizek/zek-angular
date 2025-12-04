// import { KeyPair } from "../models/key-pair.model";
// import { Tree } from "../models/tree.model";

import { IdName, KeyPair, KeyPairEx, Tree } from "../models";
import { IFlattenTree, IFlattenTreeNode, INode, ITreeNode } from "../models/tree";
import { ObjectHelper } from "./object-helper";



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

    /**
     * Returns a new array with duplicates removed based on a specific key or selector.
     * @param array The source array.
     * @param keySelector A function that returns the value to compare by.
     */
    static distinctBy<T, K>(array: T[], keySelector: (item: T) => K): T[] {
        // Guard clause for null/undefined or empty arrays
        if (!array || array.length === 0) {
            return [];
        }

        const seen = new Set<K>();
        const result: T[] = [];

        // Using a for...of loop is often cleaner than standard for loop in modern JS
        for (const item of array) {
            const key = keySelector(item);

            if (!seen.has(key)) {
                seen.add(key);
                result.push(item);
            }
        }

        return result;
    }


    /**
     * Filters an array based on whether the value derived by the keySelector 
     * equals the filterValue.
     * @param filterValue The value to match.
     * @param keySelector A function that takes an item of type T and returns the key value of type K.
     * @param array The array of items to filter.
     * @returns A new array containing only the items that match the filter criteria.
     */
    static filterByKey<T, K>(filterValue: K, keySelector: (item: T) => K, array: T[]): T[] {
        // 1. Handle edge cases: if filterValue is undefined or null, or the array is null/empty,
        //    return the array or an empty array, respectively.
        if (typeof filterValue === 'undefined' || filterValue === null || !array) {
            return array || [];
        }

        // 2. Filter the array using the keySelector for comparison
        return array.filter((item: T) => {
            // Ensure the item itself is not undefined or null before trying to get its key
            if (!ObjectHelper.isDefined(item)) {
                return false;
            }
            // Get the specific key value for the current item
            const itemKey = keySelector(item);

            // Return true if the item's key value strictly equals the filterValue
            return itemKey === filterValue;
        });
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

    /**
    * @deprecated use flattenDropDownList2
    */
    static flattenDropDownList(tree: Tree | Tree[], indent: number = 0) {
        let result: IFlattenTree[] = [];
        // If the input is an array of trees, we process each one
        if (!Array.isArray(tree)) {
            // Add the current tree node to the result
            let item: IFlattenTree = {
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

    static flattenTreeNodeDropDownList(tree: ITreeNode | ITreeNode[], indent: number = 0) {
        let result: IFlattenTreeNode[] = [];
        // If the input is an array of trees, we process each one
        if (!Array.isArray(tree)) {
            // Add the current tree node to the result
            let item: IFlattenTreeNode = {
                id: tree.id,
                name: '&emsp;'.repeat(indent) + tree.name,
                indent: indent,
                count: Array.isArray(tree.children) ? tree.children.length : 0
            } as IFlattenTree;
            result.push(item);
            // If there are children, recursively flatten them
            if (Array.isArray(tree.children)) {
                result.push(...this.flattenTreeNodeDropDownList(tree.children, indent + 1)); // Use spread operator for efficiency
            }
        } else {
            for (const item of tree) {
                result.push(...this.flattenTreeNodeDropDownList(item, indent));
            }
        }

        return result;
    }


    private static enumToKeyPairBaseArray<T extends KeyPair<number, string>>(value: any): T[] {
        const keys = Object.keys(value);
        const slice = keys.length / 2;
        const result: T[] = [];
        for (let i = slice; i < keys.length; i++) {
            const name = keys[i];
            result.push({ key: + value[name], value: name } as T);
        }
        return result;
    }
    static enumToKeyPairArray(value: any): KeyPair<number, string>[] {
        return this.enumToKeyPairBaseArray<KeyPair<number, string>>(value);
    }
    static enumToKeyPairExArray(value: any): KeyPairEx<number, string>[] {
        return this.enumToKeyPairBaseArray<KeyPairEx<number, string>>(value);
    }

    static enumToArray<T extends IdName<number, string>>(value: any): T[] {
        const keys = Object.keys(value);
        const slice = keys.length / 2;
        const result: T[] = [];
        for (let i = slice; i < keys.length; i++) {
            const name = keys[i];
            result.push({ id: + value[name], name: name } as T);
        }
        return result;
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