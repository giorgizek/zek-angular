import { ArrayHelper } from './array-helper';

export class CssHelper {
    static addClass<T extends string | string[] | null | undefined>(clazz: T, addClasses?: string | string[] | null): T {
        if (!clazz || clazz === '' || clazz.length == 0) {
            return addClasses as T;
        }

        if (!addClasses || addClasses === '') {
            return clazz;
        }


        const arr = ArrayHelper.distinct(this.parseClassNames(clazz).concat(this.parseClassNames(addClasses)));

        return Array.isArray(clazz) ? arr as T : arr.join(' ') as T;
    }


    static removeClass<T extends string | string[] | null | undefined>(clazz: T, removeClasses?: string | string[] | null): T {
        if (!clazz || clazz === '') {
            return clazz;
        }

        if (!removeClasses || removeClasses === '' || removeClasses.length === 0) {
            return clazz;
        }

        const arrClasses = this.parseClassNames(clazz);
        const arrRemove = this.parseClassNames(removeClasses);

        const arr: any[] = [];
        for (var i = 0; i < arrClasses.length; i++) {
            const val = arrClasses[i];
            if (!ArrayHelper.contains(arrRemove, val)) {
                arr.push(val);
            }
        }
        return Array.isArray(clazz) ? arr as T : arr.join(' ') as T;
    }


    static parseClassNames(raw?: string | string[] | null) {
        if (Array.isArray(raw)) {
            return raw
        }

        if (typeof raw === 'string') {
            return raw.split(/\s+/)
        }

        return []
    }
}