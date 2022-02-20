// import { KeyPair } from "../models/key-pair.model";
// import { Tree } from "../models/tree.model";

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


    //    static treeToKeyPairArray(value: Tree[]) {

    //         let result: KeyPair[] = [];
    //         if (value) {
    //             value.forEach(tree => {
    //                 result.push({ key: tree.key, value: tree.value });
    //                 result = result.concat(this.getChildren(tree));
    //             });
    //         }

    //         return result;
    //     }


    //     private static getChildren(tree: Tree, indent: number = 1): KeyPair[] {
    //         let result: KeyPair[] = [];
    //         if (tree.children) {
    //             tree.children.forEach(child => {
    //                 //result.push({ key: child.key, value: '└' + '─'.repeat(indent) + child.value });
    //                 result.push({ key: child.key, value: '&emsp;'.repeat(indent) + child.value });
    //                 result = result.concat(this.getChildren(child, indent + 1));
    //             });
    //         }
    //         return result;
    //     }
}