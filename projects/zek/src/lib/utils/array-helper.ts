// import { KeyPair } from "../models/key-pair.model";
// import { Tree } from "../models/tree.model";

import { KeyPair, KeyPairEx, Tree } from "../models";

export class ArrayHelper {
    static insert(value: any[], index: number, v: any) {
        value.splice(index, 0, v);
    };

    static contains(value: any[], v: any) {
        for (var i = 0; i < value.length; i++) {
            if (value[i] === v) return true;
        }
        return false;
    };

    static distinct(value: any[]) {
        var arr: any[] = [];
        for (var i = 0; i < value.length; i++) {
            let val = value[i];
            if (!this.contains(arr, val)) {
                arr.push(val);
            }
        }
        return arr;
    }



    static flattenArray(value: any[]): any[] {
        let result: any[] = [];
        if (value) {
            value.forEach(tree => {
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



    static treeToKeyPairArray(value: Tree[]) {
        let result: KeyPair[] = [];
        if (value) {
            value.forEach(tree => {
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
        let result: T[] = [];
        // for (let i = 0; i < slice; i++) {
        //     result.push({ key: +keys[i], value: keys[i + slice] } as T);
        // }
        for (let i = slice; i < keys.length; i++) {
            let name = keys[i];
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