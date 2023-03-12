import { OnInit, Directive, OnDestroy } from '@angular/core';
import { Convert } from '../utils';



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
            await this.onBound();
        }
        finally {
            this.loading = false;
        }
    }
    init() { }
    bindModel() { }
    bindDictionary() { }
    onBound() { }

    async destroy() {
    }
}