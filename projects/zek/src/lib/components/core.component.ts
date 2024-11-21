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

    private _name: string = `zek-${++uniqueId}`;
    get name(): string {
        return this._name;
    }
    @Input()
    set name(value: string) {
        if (this._name !== value) {
            this._name = value;
            this.onNameChanged();
        }
    }
    onNameChanged() { }

    async destroy() {
    }
}