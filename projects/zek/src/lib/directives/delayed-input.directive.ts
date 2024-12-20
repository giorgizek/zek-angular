import { Directive, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Convert, MathHelper } from '../utils';
import { NumberInput } from '../components';

@Directive({
    standalone: true,
    selector: '[zek-delayed-input]'
})
export class ZekDelayedInputDirective implements OnInit {//OnChanges

    private _inputSubject$ = new Subject<string>();
    @Output() delayedInput = new EventEmitter<string>();

    private _delay = 500;
    get delay(): number {
        return this._delay;
    }
    @Input()
    set delay(v: NumberInput) {
        const tmp = MathHelper.clamp(Convert.toNumber(v), 1, 3_600_000);
        if (this._delay !== tmp) {
            this._delay = tmp;
        }
    }

    ngOnInit() {
        this.initSubscription();
    }

    private initSubscription() {
        // Emit values after the specified debounce time
        this._inputSubject$.pipe(debounceTime(this.delay)).subscribe((value) => {
            this.delayedInput.emit(value);
        });
    }

    // ngOnChanges(changes: SimpleChanges) {
    //     if (changes['delayTime']) {
    //         // Reset the subscription when delayTime changes
    //         this._inputSubject$ = new Subject<string>(); // Replace the Subject
    //         this.initSubscription(); // Reinitialize with the new delayTime
    //       }
    // }

    @HostListener('input', ['$event.target.value'])
    onInput(value: string) {
        this._inputSubject$.next(value); // Push new value to the Subject
    }
}
