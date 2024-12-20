import { Directive, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Convert, MathHelper } from '../utils';
import { NumberInput } from '../components';

@Directive({
    standalone: true,
    selector: '[zek-delayed-input]'
})
export class ZekDelayedInputDirective  {
    private _inputSubject$ = new Subject<string>();
    @Output() delayedInput = new EventEmitter<string>();

    private _delay: number = 500;
    get delay(): number {
        return this._delay;
    }
    @Input()
    set delay(v: NumberInput) {
        const tmp = MathHelper.clamp(Convert.toNumber(v) || 0, 1, 3_600_000);
        if (this._delay !== tmp) {
            this._delay = tmp;
        }
    }

    constructor() {
        // Emit values after the specified debounce time
        this._inputSubject$.pipe(debounceTime(this.delay)).subscribe((value) => {
            this.delayedInput.emit(value);
        });
    }

    @HostListener('input', ['$event.target.value'])
    onInput(value: string) {
      this._inputSubject$.next(value); // Push new value to the Subject
    }
}
