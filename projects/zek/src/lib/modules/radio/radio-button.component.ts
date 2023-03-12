import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanInput } from '../../components';
import { CoreUiComponent } from '../../components/core-ui.component';
import { Convert } from '../../utils';

let uniqueId = 0;

/**
 * Provider Expression that allows zek-radio to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
const ZEK_RADIO_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioComponent),
    multi: true,
};


@Component({
    selector: 'zek-radio',
    templateUrl: './radio.component.html',
    host: {
        '[attr.id]': 'id',
        '[attr.tabindex]': 'null',
        '[attr.aria-label]': 'null',
        '[attr.aria-labelledby]': 'null',
        '[attr.aria-describedby]': 'null',
        // Note: under normal conditions focus shouldn't land on this element, however it may be
        // programmatically set, for example inside of a focus trap, in this case we want to forward
        // the focus to the native element.
        '(focus)': '_inputElement.nativeElement.focus()',

    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ZEK_RADIO_CONTROL_VALUE_ACCESSOR],
})
export class RadioComponent extends CoreUiComponent
    implements OnInit {
    constructor(
        private _changeDetector: ChangeDetectorRef,
        _renderer: Renderer2,
        _elementRef: ElementRef) {
        super(_renderer, _elementRef);
    }


    private _uniqueId: string = `zek-radio-${++uniqueId}`;

    /** The unique ID for the radio button. */
    @Input() id: string = this._uniqueId;

    /** Used to set the 'aria-label' attribute on the underlying input element. */
    @Input('aria-label') ariaLabel?: string | null;

    /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
    @Input('aria-labelledby') ariaLabelledby?: string | null;

    /** The 'aria-describedby' attribute is read after the element's label and field type. */
    @Input('aria-describedby') ariaDescribedby?: string | null;

    /** The native `<input type=radio>` element */
    @ViewChild('input') _inputElement?: ElementRef<HTMLInputElement> | null;



    private _inline: boolean = false;
    get inline() {
        return this._inline;
    }
    @Input()
    set inline(v: BooleanInput) {
        let newValue = Convert.toBooleanProperty(v);
        if (this._inline !== newValue) {
            this._inline = newValue;
            this.onInlineChanged();
        }
    }
    onInlineChanged() { }

    get inputId(): string {
        return `${this.id || this._uniqueId}-input`;
    }


    /** The value from ngModel. */
    private modelValue: any;


    private _checked: boolean = false;
    @Input()
    get checked(): boolean {
        return this._checked;
    }
    set checked(value: BooleanInput) {
        const newCheckedState = Convert.toBooleanProperty(value);
        if (this._checked !== newCheckedState) {
            this._checked = newCheckedState;
            this._markForCheck();
        }
    }


    override writeValue(value: any): void {
        if (this.modelValue !== value) {
            this.modelValue = value;
            this.checked = this.modelValue === this._value;
        }

    }
    override onValueChanged() {
        if (!this.checked) {
            // Update checked when the value changed to match the radio group's value
            this.checked = this.modelValue === this._value;
        }
    }


    override onRequiredChanged(): void {
        this._markForCheck();
    }
    override onDisabledChanged() {
        this._markForCheck();
    }


    /**
     * Marks the radio button as needing checking for change detection.
     * This method is exposed because the parent radio group will directly
     * update bound properties of the radio button.
     */
    private _markForCheck() {
        // When group value changes, the button will not be notified. Use `markForCheck` to explicit
        // update radio button's status
        this._changeDetector.markForCheck();
    }


    override init(): void {
        // Determine if it should be checked
        this.checked = this.modelValue === this._value;
    }


    /** Triggered when the radio button receives an interaction from the user. */
    override _onInputInteraction(event: Event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();

        if (!this.checked && !this.disabled) {
            const modelValueChanged = this.value !== this.modelValue;
            this.checked = true;
            this.modelValue = this._value;
            this._emitChangeEvent();

            if (modelValueChanged) {
                this._onChange(this._value);
            }
        }
    }
}