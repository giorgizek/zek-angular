import { Injectable, Input } from "@angular/core";
import { Subject, Subscription, timer } from "rxjs";
import { map, takeWhile, tap } from "rxjs/operators";
import { DateHelper } from "../../utils";

@Injectable()
export class TimerService {
    @Input() seconds = 0;

    // running = false;
    
    private _count = 0;
    public get count() {
        return this._count;
    }
    
    private _left = 0;
    public get left() {
        return this._left;
    }

    expireDate: Date | null = null;
    private subscription: Subscription | null = null;
    //@Output() checkTime: EventEmitter<number> = new EventEmitter();

    tick = new Subject<number>();
    completed = new Subject<any>();
    // tickerInterval: any;
    // expired: Observable<number> = new Observable<number>();
    // initialCountValue: number = 0;


    startHour(hours: number, minutes: number, seconds: number) {
        this.start((hours ? hours * 60 * 60 : 0) + (minutes ? minutes * 60 : 0) + seconds);
    }
    startMinute(minutes: number, seconds: number) {
        this.start((minutes ? minutes * 60 : 0) + seconds);
    }
    start(seconds: number) {
        this.clear();

        this._left = seconds;
        this._count = seconds;
        this.expireDate = DateHelper.addSeconds(new Date(), seconds);

        //this.internalTick();//because run first tick value example 60 ->  not 59
        const source = timer(0, 1000).pipe(
            //map(i => this.count - i),
            //takeWhile(i => i > 0),
            map(_i => this._left--),
            takeWhile(_i => this.left >= 0)
            //tap(s => this.checkTime.emit(s))
        );

        this.subscription = source.subscribe(() => {
            this.internalTick();
        });
    }
    clear() {
        this.subscription?.unsubscribe();
        this.subscription = null;
        this.expireDate = null;
    }


    internalTick() {
        if (this.tick) {
            this.tick.next(this._left);
        }

        if (this.left <= 0 && this.completed) {
            this.completed.next(null);
        }
        /*
        // get total seconds between the times
        let delta = Math.abs(date_future - date_now) / 1000;

        // calculate (and subtract) whole days
        let days = Math.floor(delta / 86400);
        delta -= days * 86400;

        // calculate (and subtract) whole hours
        let hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        let minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        // what's left is seconds
        let seconds = delta % 60;  // in theory the modulus is not required
        */
    }
}