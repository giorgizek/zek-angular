import { AfterContentInit, Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { Convert } from "../utils";
import { CancelArgs } from "./args";
import { CoreComponent } from "./core.component";
import { BooleanInput } from "./types";

let uniqueId = 0;

@Directive()
export class CoreUiComponent extends CoreComponent
    implements AfterContentInit, ControlValueAccessor {
    constructor(
        protected _renderer: Renderer2,
        protected _elementRef: ElementRef
        //private _changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    /** The method to be called in order to update ngModel */
    _onChange: (value: any) => void = () => { };

    /**
     * onTouch function registered via registerOnTouch (ControlValueAccessor).
     * @docs-private
     */
    _onTouched: () => any = () => { };


    /**
   * Helper method that sets a property on a target element using the current Renderer
   * implementation.
   * @nodoc
   */
    protected setProperty(key: string, value: any): void {
        this._renderer.setProperty(this._elementRef.nativeElement, key, value);
    }

    @Output() readonly change: EventEmitter<any> = new EventEmitter<any>();
    @Output() readonly changing: EventEmitter<CancelArgs> = new EventEmitter<CancelArgs>();

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


    private _isInitialized = false;
    get isInitialized() {
        return this._isInitialized;
    }

    protected _value: any = null;
    get value(): any {
        return this._value;
    }
    @Input()
    set value(newValue: any) {
        if (this._value !== newValue) {
            const cancelEventArgs: CancelArgs = {
                oldValue: this._value,
                newValue: newValue
            };

            this.onValueChanging(cancelEventArgs);
            if (cancelEventArgs.cancel === true)
                return;

            // Set this before proceeding to ensure no circular loop occurs with selection.
            this._value = newValue;
            this.onValueChanged();
        }
    }
    onValueChanging(e: CancelArgs) {
        this.changing.emit(e);
    }
    onValueChanged() { }

    /**
     * Use this method for client side change
     * @param newValue 
     */
    setNgModel(newValue: any) {
        if (!this.disabled) {
            if (this._value !== newValue) {
                this.value = newValue;
                this._emitChangeEvent();
                this._onChange(this._value);//write value to NgModel
            }
        }
    }

    private _readonly = false;
    /** Whether the component is disabled */
    get readonly(): boolean {
        return this._readonly;
    }
    @Input()
    set readonly(value: BooleanInput) {
        const v = Convert.toBooleanProperty(value);
        if (this._readonly !== v) {
            this._readonly = v;
            this.onReadOnlyChanged();
        }
    }
    onReadOnlyChanged() { }


    private _disabled = false;
    /** Whether the component is disabled */
    get disabled(): boolean {
        return this._disabled;
    }
    @Input()
    set disabled(value: BooleanInput) {
        const v = Convert.toBooleanProperty(value);
        if (this._disabled !== v) {
            this._disabled = v;
            this.onDisabledChanged();
        }
    }
    onDisabledChanged() { }


    private _required = false;
    /** Whether the component is required */
    get required(): boolean {
        return this._required;
    }
    @Input()
    set required(value: BooleanInput) {
        const v = Convert.toBooleanProperty(value);
        if (this._required !== v) {
            this._required = v;
            this.onRequiredChanged();
        }
    }
    onRequiredChanged() { }


    _onInputInteraction(event: Event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
        this.setNgModel((event.target as any).value);
    }

    /** Dispatch change event with current value. */
    _emitChangeEvent(): void {
        if (this._isInitialized) {
            this.change.emit(this._value);
        }
    }


    ngAfterContentInit() {
        // Mark this component as initialized in AfterContentInit because the initial value can
        // possibly be set by NgModel on component, and it is possible that the OnInit of the
        // NgModel occurs *after* the OnInit of the component.
        this._isInitialized = true;
    }


    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * (write from model to el.nativeElement)
     * @param value
     */
    writeValue(value: any) {
        this.value = value;
        //this._changeDetector.markForCheck();
        //this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
    }

    /**
     * Registers a callback to be triggered when the model value changes.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    registerOnChange(fn: (_: any) => void): void {
        this._onChange = fn;
    }

    /**
     * Registers a callback to be triggered when the control is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    registerOnTouched(fn: any) {
        this._onTouched = fn;
    }


    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param isDisabled Whether the control should be disabled.
     */
    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
        //this._changeDetector.markForCheck();
        //this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }
}