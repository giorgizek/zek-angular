export class StorageHelper {
    // Check if logic is running in a browser environment
    private static isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
    }

    /**
     * Saves data to localStorage.
     * Automatically stringifies objects, arrays, booleans, and numbers.
     */
    static set(key: string, value: any): void {
        if (!this.isBrowser() || !key) return;

        // Fix: Only remove if strictly null or undefined.
        // Prevents accidental deletion of 0, false, or ""
        if (value === null || value === undefined) {
            this.remove(key);
            return;
        }

        try {
            // If it's a string, store as is. Otherwise, stringify it.
            const data = typeof value === 'string' ? value : JSON.stringify(value);
            localStorage.setItem(key, data);
        } catch (error) {
            console.error(`Error saving ${key} to localStorage`, error);
        }
    }

    /**
     * Retrieves data from localStorage.
     * Tries to parse JSON; returns string (or original type) if parsing fails.
     */
    static get<T = any>(key: string): T | string | null {
        if (!this.isBrowser() || !key) return null;

        const item = localStorage.getItem(key);

        if (item === null) return null;

        try {
            // Fix: robust parsing handles objects, arrays, and stringified primitives
            return JSON.parse(item) as T;
        } catch (e) {
            // If parsing fails, return the raw string
            return item as unknown as T;
        }
    }

    /**
     * Removes a specific item.
     */
    static remove(key: string): void {
        if (!this.isBrowser() || !key) return;
        localStorage.removeItem(key);
    }

    /**
     * Clears all local storage.
     */
    static clear(): void {
        if (!this.isBrowser()) return;
        localStorage.clear();
    }
}

export class SessionStorageHelper {
    // Check if logic is running in a browser environment
    private static isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
    }

    /**
     * Saves data to sessionStorage.
     * automatically stringifies objects/arrays.
     */
    static set(key: string, value: any) {
        if (!this.isBrowser() || !key) return;

        // Fix: Only remove if strictly null or undefined. 
        // Allowing false, 0, or "" to be stored.
        if (value === null || value === undefined) {
            this.remove(key);
            return;
        }


        try {
            // Store strings as is, stringify everything else (objects, arrays, numbers, booleans)
            const data = typeof value === 'string' ? value : JSON.stringify(value);
            sessionStorage.setItem(key, data);
        } catch (error) {
            console.error(`Error saving ${key} to sessionStorage`, error);
        }
    }



    /**
     * Retrieves data from sessionStorage.
     * Tries to parse JSON; returns string if parsing fails.
     */
    static get<T = any>(key: string): T | string | null {
        if (!this.isBrowser() || !key) return null;

        const item = sessionStorage.getItem(key);

        if (item === null) return null;

        try {
            // Attempt to parse. This handles objects "{}", arrays "[]", 
            // and stringified primitives like "true" or "123".
            return JSON.parse(item) as T;
        } catch (e) {
            // If parsing fails, it was likely a simple string to begin with.
            // Return as-is.
            return item as unknown as T;
        }
    }


    /**
     * Removes a specific item.
     */
    static remove(key: string): void {
        if (!this.isBrowser() || !key) return;
        sessionStorage.removeItem(key);
    }

    /**
     * Clears all session storage.
     */
    static clear(): void {
        if (!this.isBrowser()) return;
        sessionStorage.clear();
    }
}