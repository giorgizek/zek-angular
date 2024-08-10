import { Component, Input } from '@angular/core';
import { interval, Observable, Subject, Subscription, timer } from 'rxjs';
import { CoreComponent } from '../../components';
import { DateHelper } from '../../utils';

@Component({
    standalone: true,
    imports: [],
    selector: 'zek-countdown',
    templateUrl: 'countdown.html'
})
export class ZekCountdown extends CoreComponent {
    override destroy() {
        stop();
        return super.destroy();
    }


    left = {
        days: 0,
        hours: 0,
        hh: '00',
        minutes: 0,
        mm: '00',
        seconds: 0,
        ss: '00'
    }
    date = new Date();


    private _interval$?: Observable<number> | null;
    private _subscription?: Subscription;


    // private _onTickSubject?: Subject<void>;
    // private _onTickObservable?: Observable<void>;
    // get onRefreshToken(): Observable<void> {
    //     if (!this._onTickSubject) {
    //         this._onTickSubject = new Subject<void>();
    //         this._onTickObservable = this._onTickSubject.asObservable();
    //     }

    //     if (!this._onTickObservable)
    //         throw new Error("_onTickObservable is undefined");

    //     return this._onTickObservable;
    // }

    override init() {
        this.start();
        this.tick();
    }

    private _targetDate: Date | null = null;
    private _targetTime: number | null = null;
    get targetDate(): Date | null {
        return this._targetDate;
    }
    @Input()
    set targetDate(v: Date | string | number | null | undefined) {
        this._targetDate = DateHelper.parseDate(v)
        this._targetTime = this._targetDate ? this._targetDate.getTime() : null;
    }


    start() {
        this._interval$ = interval(1000);
        this._subscription = this._interval$.subscribe(() => {
            this.emitTick();
        });
    }
    stop() {
        this._subscription?.unsubscribe();
        this._interval$ = null;

        // this._onTickSubject?.complete();
        // this._onTickSubject?.unsubscribe();
    }

    emitTick() {
        this.tick();
        // this._onTickSubject?.next();
    }



    reset() {
        this.left = {
            days: 0,
            hours: 0,
            hh: '00',
            minutes: 0,
            mm: '00',
            seconds: 0,
            ss: '00'
        }
    }

    tick() {
        this.reset();

        if (!this.targetDate || !this._targetTime) return;

        this.date = new Date();
        const now = this.date.getTime();

        const difference = this._targetTime - now;
        if (difference < 0) {
            this.stop();
            return
        }

        this.left.days = Math.floor(difference / (1000 * 60 * 60 * 24));

        this.left.hours = 23 - this.date.getHours();
        this.left.hh = (this.left.hours < 10 ? '0' : '') + this.left.hours;

        this.left.minutes = 60 - this.date.getMinutes();
        this.left.mm = (this.left.minutes < 10 ? '0' : '') + this.left.minutes;


        this.left.seconds = 60 - this.date.getSeconds();
        this.left.ss = (this.left.seconds < 10 ? '0' : '') + this.left.seconds;
    }
}