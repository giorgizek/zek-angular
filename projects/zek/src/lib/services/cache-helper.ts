import { Observable, of, tap } from "rxjs";

interface CacheContent {
    expiry: number;
    value: any;
}

export class CacheHelper {
    private static _cache = new Map<string, CacheContent>();

    static get(key: string): Observable<any> | undefined {
        const data = this._cache.get(key);
        if (!data) {
            return undefined;
        }

        const now = new Date().getTime();
        if (now > data.expiry) {
            this._cache.delete(key);
            return undefined;
        }

        return of(data.value);
    }

    // Set data to cache
    static set(key: string, value: any, minutes: number = 5): Observable<any> {
        const expiry = new Date().getTime() + minutes * 60000;
        this._cache.set(key, { expiry, value });
        return of(value);
    }

    // Cache and return the Observable
    static getOrCreate(key: string, fallback: Observable<any>, minutes?: number): Observable<any> {
        const cached = this.get(key);
        if (cached) {
            return cached;
        } else {
            return fallback.pipe(
                tap(value => {
                    this.set(key, value, minutes);
                })
            );
        }
    }
}