﻿import { Component, Input } from '@angular/core';
import { BooleanInput, NumberInput } from '../../components';
import { Convert, MathHelper } from '../../utils';
import { CommonModule } from '@angular/common';

type Background = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'body' | 'white' | 'transparent';

@Component({
    standalone: true,
    selector: 'zek-progress',
    templateUrl: './progress.html',
    styles: [':host { display: block; }'],
    imports: [
        CommonModule
    ]
})
export class ZekProgress {
    @Input()
    get value(): number {
        return this._value;
    }
    set value(v: NumberInput) {
        const tmp = MathHelper.clamp(Convert.toNumber(v) || 0, 0, 100);
        if (this._value !== tmp) {
            this._value = tmp;
        }
    }
    private _value: number = 0;


    @Input()
    get showValue(): boolean {
        return this._showValue;
    }
    set showValue(v: BooleanInput) {
        this._showValue = Convert.toBooleanProperty(v);
    }
    private _showValue = false;

    @Input()
    get showTitle(): boolean {
        return this._showTitle;
    }
    set showTitle(v: BooleanInput) {
        this._showTitle = Convert.toBooleanProperty(v);
    }
    private _showTitle = true;

    get _title() {
        return this._showTitle ? `${this._value} %` : null;
    }


    @Input()
    get striped(): boolean {
        return this._striped;
    }
    set striped(v: BooleanInput) {
        this._striped = Convert.toBooleanProperty(v);
    }
    private _striped = false;


    @Input()
    get animated(): boolean {
        return this._animated;
    }
    set animated(v: BooleanInput) {
        this._animated = Convert.toBooleanProperty(v);
    }
    private _animated = false;

    @Input()
    get label() {
        return this._label;
    }
    set label(v: string | null | undefined) {
        this._label = v ? v : null;
    }
    private _label: string | null = null;



    @Input()
    get height() {
        return this._height;
    }
    set height(v: NumberInput) {
        const tmp = Convert.toNumber(v) || 0;
        this._height = tmp > 0 ? tmp : null;
    }
    private _height: number | null = null;


    @Input()
    get background() {
        return this._background;
    }
    set background(v: Background) {
        this._background = v;
    }
    private _background: Background = 'primary';
}