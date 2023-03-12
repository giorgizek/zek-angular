import { Component, Input } from "@angular/core";

@Component({
    selector: 'zek-wizard',
    templateUrl: './wizard.component.html'
})
export class WizardComponent {

    progress = 0;
    stepsArray: { step: number, progress: number }[] = [
        { step: 1, progress: 0 }
    ];

    private _steps: number = 1;
    @Input()
    get steps(): number {
        return this._steps;
    }
    set steps(v: number) {
        if (v < 1) v = 1;

        if (this._steps !== v) {
            this._steps = v;
            this.init();
        }
    }


    private _step: number = 1;
    @Input()
    get step(): number {
        return this._step;
    }
    set step(v: number) {
        if (v < 1) v = 1;
        else if (v > this.steps) v = this.steps;

        if (this._step !== v) {
            this._step = v;

            let found = this.stepsArray.find(x => x.step === this._step);
            if (found) {
                this.progress = found.progress;
            }
        }
    }


    private init() {
        this.stepsArray = [];
        this.stepsArray.push({ step: 1, progress: 0 });

        for (let i = 1; i < this.steps; i++) {
            this.stepsArray.push({ step: i + 1, progress: Math.round(100 / (this.steps - 1) * i) });
        }
    }

    previous() {
        this.step--;
    }
    next() {
        this.step++;
    }
}