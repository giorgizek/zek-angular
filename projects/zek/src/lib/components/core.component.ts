import { OnInit, Directive, OnDestroy, Input } from '@angular/core';

let uniqueId = 0;

@Directive()
export class CoreComponent implements OnInit, OnDestroy {
    loading = false;

    ngOnInit() {
        this.load();
    }
    ngOnDestroy() {
        this.destroy();
    }


    uniqueId = ++uniqueId;
 
    async load() {
        try {
            if (this.loading) return;

            this.loading = true;
            await this.init();
            await this.bindModel();
            await this.bindDictionary();
            await this.onBindingCompleted();
        }
        finally {
            this.loading = false;
        }

        await this.onLoadCompleted();
    }
    init() { }
    bindModel() {
        this.onBindModelCompleted();
    }
    onBindModelCompleted() { }
    bindDictionary() { }
    onBindingCompleted() { }
    onLoadCompleted() { }

    async destroy() {
    }
}