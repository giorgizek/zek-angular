// import { KeyPair } from "../models/key-pair.model";
// import { Tree } from "../models/tree.model";

import { KeyPair, KeyPairEx, Tree } from "../models";
import { IFlattenTree } from "../models/flatten-tree";


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
        // If the input is an array of trees, we process each one
        if (Array.isArray(array)) {
            for (const item of array) {
                result = result.concat(this.flatten(item, indent));
            }
        } else {
            // Add the current tree node to the result
            const item = Object.assign({}, array);
            item.indent = indent;
            item.count = Array.isArray(array.children)
                ? array.children.length
                : 0;
            delete item.children;
            delete item.childrenIds;
            result.push(item);
            // If there are children, recursively flatten them
            if (Array.isArray(array.children)) {
                for (const child of array.children) {
                    result = result.concat(this.flatten(child, indent + 1));
                }
            }
        }

        return result;
    }

    static flattenDropDownList(tree: Tree | Tree[], indent: number = 0) {
        let result: IFlattenTree[] = [];
        // If the input is an array of trees, we process each one
        if (Array.isArray(tree)) {
            for (const item of tree) {
                result = result.concat(this.flattenDropDownList(item, indent));
            }
        } else {
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
                for (const child of tree.children) {
                    result = result.concat(this.flattenDropDownList(child, indent + 1));
                }

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
}