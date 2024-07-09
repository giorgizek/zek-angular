import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { BooleanInput, NumberInput } from "../../components";
import { Convert, MathHelper } from "../../utils";

@Directive({
    standalone: true,
    selector: "[numeric]",
})
export class NumericDirective {
    private _digits = 0;
    get digits() {
        return this._digits;
    }
    @Input()
    set digits(v: NumberInput) {
        const tmp = MathHelper.clamp(Convert.toNumber(v) || 0, 0, 29);
        this._digits = tmp;
    }

    private _negative = false;
    get negative(): boolean {
        return this._negative;
    }
    @Input() set negative(v: BooleanInput) {
        this._negative = Convert.toBooleanProperty(v);
    }

    private checkAllowNegative(value: string) {
        if (this._digits <= 0) {
            return String(value).match(new RegExp(/^-?\d+$/));
        } else {
            const regExpString =
                "^-?\\s*((\\d+(\\.\\d{0," +
                this._digits +
                "})?)|((\\d*(\\.\\d{1," +
                this._digits +
                "}))))\\s*$";
            return String(value).match(new RegExp(regExpString));
        }
    }

    private check(value: string) {
        if (this._digits <= 0) {
            return String(value).match(new RegExp(/^\d+$/));
        } else {
            const regExpString =
                "^\\s*((\\d+(\\.\\d{0," +
                this._digits +
                "})?)|((\\d*(\\.\\d{1," +
                this._digits +
                "}))))\\s*$";
            return String(value).match(new RegExp(regExpString));
        }
    }

    private run(oldValue: any) {
        setTimeout(() => {
            const currentValue: string = this.el.nativeElement.value;
            const allowNegative = this._negative;

            if (allowNegative) {
                if (
                    !["", "-"].includes(currentValue) &&
                    !this.checkAllowNegative(currentValue)
                ) {
                    this.el.nativeElement.value = oldValue;
                }
            } else {
                if (currentValue !== '' && !this.check(currentValue)) {
                    this.el.nativeElement.value = oldValue;
                }
            }
        });
    }


    constructor(private el: ElementRef) { }

    @HostListener("keydown", ["$event"])
    onKeyDown(event: KeyboardEvent) {
        this.run(this.el.nativeElement.value);
    }

    @HostListener("paste", ["$event"])
    onPaste(event: ClipboardEvent) {
        this.run(this.el.nativeElement.value);
    }
}