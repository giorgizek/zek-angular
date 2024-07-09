import { Directive, ElementRef, OnDestroy, forwardRef, Inject } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DATE_FORMAT, LANGUAGE } from '../../tokens';
import { DateHelper } from '../../utils';

declare let Datepicker: any;

const DATE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateValueAccessor),
    multi: true,
};



@Directive({
    selector: '[zek-date],input[type=date][formControlName],input[type=date][formControl],input[type=date][ngModel]',//,input[type=date][ngModel]
    providers: [DATE_VALUE_ACCESSOR],
    host: {
        //არაა საჭირო ეს ევენტი ისედაც მუშაობს'(change)': 'onChange($event.target.value)',
        //აღარ არის საჭირო რადგანაც ახა ვერსიაში updateOnBlur=true აკეთებს მაგას "(keyup)": "onKeyUp($event)",
    }
})
export class DateValueAccessor implements ControlValueAccessor, OnDestroy {
    //@Input() ngModel: any;
    private datepicker?: any;
    private oldValue?: Date | null = null;

    constructor(private el: ElementRef,
        @Inject(DATE_FORMAT) format: string,
        @Inject(LANGUAGE) language: string,
        @Inject('env') env?: any | null) {

        if (env) {
            if (env.datepickerFormat) {
                format = env.datepickerFormat;
            }
            if (env.lang) {
                language = env.lang;
            }
        }

        if (el.nativeElement.type === 'date') {
            el.nativeElement.type = 'text'//change input type to text to override browser default date editor
        }
        this.el.nativeElement.setAttribute('autocomplete', 'off');

        this.datepicker = new Datepicker(el.nativeElement, {
            autohide: true,
            //beforeShowDay: this.beforeShowDay,
            buttonClass: 'btn',
            //clearBtn: true,

            //datesDisabled: []
            daysOfWeekHighlighted: [0, 6],
            format: format,
            language: language,

            //prevArrow: '«',
            //nextArrow: '»',
            //orientation: 'top auto', //left|right|auto for horizontal and top|bottom|auto
            todayBtn: true,
            //todayBtnMode: 0, //0	focus	Move the focused date to the current date without changing the selection. 1 select	Select (or toggle the selection of) the current date
            todayHighlight: true,
            updateOnBlur: true,
            weekStart: 1,//0:Sunday – 6:Saturday
        });

        el.nativeElement.addEventListener('changeDate', (e: CustomEvent) => {
            this.onChangeDate(e);//execude 
        });

        setTimeout(() => {
            const min = this.el.nativeElement.getAttribute('min');
            const max = this.el.nativeElement.getAttribute('max');

            const minDate = min ? DateHelper.toDate(min) : null;
            const maxDate = max ? DateHelper.toDate(max) : null;
            this.datepicker.setOptions({
                minDate: minDate,//String|Date|Number
                maxDate: maxDate,//String|Date|Number
            });
        }, 0);
    }

    // onKeyUp(e: any) {

    // if (e && e.target) {
    //     let v = e.target.value;
    //     if (v && v.length === 10 && (v.indexOf('.') > 1 || (v.indexOf('/') > 1 || v.indexOf('-') > 1))) {
    //         var parsed = Datepicker.parseDate(v, environment.datepickerFormat, environment.lang);//parseDate(v);
    //         var date = parseDate(parsed);

    //         if (date) {
    //             var ev = new KeyboardEvent('keydown', {
    //                 key: "Enter",//datepicke listens only by key parameter. other parameter don't need. check after update new version!!!
    //             });
    //             console.log(e.target.dispatchEvent(ev));
    //         }
    //     }
    // }
    // }

    ngOnDestroy() {
        this.el.nativeElement.removeEventListener('changeDate', this.onChangeDate);

        if (this.datepicker && typeof this.datepicker.destroy === 'function') {
            this.datepicker.destroy()
        }
    }

    /**
     * Fires when user choose date in datepicker
     * @param e Custom event 
     */
    onChangeDate(e: CustomEvent) {
        this.setDate(e.detail.date);
    }


    // private beforeShowDay(date: any) {
    //     if (date.getMonth() == new Date().getMonth()) {
    //       switch (date.getDate()) {
    //         case 4:
    //           return {
    //             content: '<span data-bs-toggle="tooltip" title="Example tooltip">4</span>',
    //             classes: 'bg-info'
    //           };
    //         case 8:
    //           return false;
    //         case 12:
    //           return "text-success";
    //       }
    //     }
    //   }


    //set value into ngModel (when choose date in calendar)
    setDate(newValue?: Date | null) {
        //newValue = parseDate(newValue);

        if (this.isReadOnly()) {
            //if values not equals sets old value 
            if (!DateHelper.equals(newValue, this.oldValue)) {
                if (this.oldValue) {
                    this.datepicker.setDate(this.oldValue, { clear: true });//if read only don't change date (it just changes element value not ngModel)
                } else {
                    this.datepicker.setDate({ clear: true });//if read only don't change date (it just changes element value not ngModel)
                }
            }
            return;
        }

        this.oldValue = newValue;

        if (newValue) {
            this.onChange(DateHelper.toISODateString(newValue));
        } else {
            this.onChange(null);
        }
    }



    private isReadOnly() {
        return this.el.nativeElement.disabled || this.el.nativeElement.readOnly;
    }



    //write from model to el.nativeElement
    writeValue(value: any) {
        const date = DateHelper.parseDate(value);
        this.oldValue = date;

        if (date) {
            this.datepicker.setDate(date, { clear: true });//to display in input
        } else {
            this.datepicker.setDate({ clear: true });
        }



        //this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);


        // let readOnly = this.isReadOnly();
        // if (readOnly) {
        //     this.el.nativeElement.value = Datepicker.formatDate(date, this.datepicker.config.format);
        // }
        // else {
        //     this.datepicker.setDate(date);
        // }
    }
    /*writeValue(date: Date) {
        // Create UTC Date, time is set to 00:00 in UTC time
        const utcDate: Date | null = date
            ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
            : null;
        this.renderer.setProperty(this.elementRef.nativeElement, 'valueAsDate', utcDate);
    }*/

    //@HostListener('input', ['$event.target.valueAsDate']) onChange = (_: any) => { };


    //@HostListener('input', [])
    onChange: (_: any) => void = () => { };
    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    //@HostListener('blur', [])
    onTouched = () => { };
    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }
}