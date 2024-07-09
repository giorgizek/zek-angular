import { OnInit, Directive, OnDestroy } from '@angular/core';

@Directive()
export class CoreComponent implements OnInit, OnDestroy {
    loading = false;

    ngOnInit() {
        this.load();
    }
    ngOnDestroy() {
        this.destroy();
    }

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
    bindModel() { }
    bindDictionary() { }
    onBindingCompleted() { }
    onLoadCompleted() { }

    async destroy() {
    }
}