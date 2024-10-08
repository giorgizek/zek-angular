// import { KeyPair } from "../models/key-pair.model";
// import { Tree } from "../models/tree.model";

import { KeyPair, KeyPairEx, Tree } from "../models";


export class ArrayHelper {
    static insert(array: any[], index: number, item: any) {
        array.splice(index, 0, item);
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

    static flattenArray(array: any[]): any[] {
        let result: any[] = [];
        if (array) {
            array.forEach(tree => {
                tree.indent = 0;
                result.push(tree);
                result = result.concat(this.getChildren(tree));
            });
        }
        return result;
    }

    private static getChildren(tree: Tree, indent: number = 1): any[] {
        let result: any[] = [];
        if (tree.children) {
            tree.childrenCount = tree.children.length;
            tree.children.forEach(child => {
                child.indent = indent;
                result.push(child);
                result = result.concat(this.getChildren(child, indent + 1));
            });
        } else {
            tree.childrenCount = 0;
        }

        delete tree.children;
        delete tree.childrenIds;
        //delete tree.childrenCount;
        //delete tree.indent;
        return result;
    }



    static treeToKeyPairArray(array: Tree[]) {
        let result: KeyPair[] = [];
        if (array) {
            array.forEach(tree => {
                result.push({ key: tree.key, value: tree.value });
                result = result.concat(this.getIndentChildren(tree));
            });
        }

        return result;
    }


    private static getIndentChildren(tree: Tree, indent: number = 1): KeyPair[] {
        let result: KeyPair[] = [];
        if (tree.children) {
            tree.children.forEach(child => {
                //result.push({ key: child.key, value: '└' + '─'.repeat(indent) + child.value });
                result.push({ key: child.key, value: '&emsp;'.repeat(indent) + child.value });
                result = result.concat(this.getChildren(child, indent + 1));
            });
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