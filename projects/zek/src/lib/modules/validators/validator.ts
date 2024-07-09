// import { AbstractControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms'
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// export const range = (range?: Array<number> | null): ValidatorFn => {
//     return (control: AbstractControl): { [key: string]: any } | null => {

//         if (!range) return null;
//         if (Validators.required(control)) return null;

//         let v: number = +control.value;
//         return v >= range[0] && v <= range[1] ? null : { actualValue: v, requiredValue: range, range: true };
//     };
// };
// export function blue(): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null =>
//         control.value?.toLowerCase() === 'blue'
//             ? null : { wrongColor: control.value };
// }


function isEmptyInputValue(value: any): boolean {
    /**
     * Check if the object is a string or array before evaluating the length attribute.
     * This avoids falsely rejecting objects that contain a custom length attribute.
     * For example, the object {id: 1, length: 0, width: 0} should not be returned as empty.
     */
    return typeof value === 'undefined' || value == null || ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
}

/**
 * Function that has `ValidatorFn` shape, but performs no operation.
 */
export function nullValidator(control: AbstractControl): ValidationErrors | null {
    return null;
}


export class Validators {

    /**
    * @description
    * Validator that requires the control's value to be less than or equal to the provided number.
    *
    * @usageNotes
    *
    * ### Validate against a range 0 - 15
    *
    * ```typescript
    * const control = new FormControl(16, Validators.max([0,15]));
    *
    * console.log(control.errors); // {range: {min: 0, max: 15, actual: 16}}
    * ```
    *
    * @returns A validator function that returns an error map with the
    * `range` property if the validation check fails, otherwise `null`.
    *
    * @see `updateValueAndValidity()`
    *
    */
    static range(min: number, max: number): ValidatorFn {
        return rangeValidator([min, max]);
    }


    /**
* @description
* Validator that requires the control's value to be less than or equal to the provided number.
*
* @usageNotes
*
* ### Validate against a range 0 - 15
*
* ```typescript
* const control = new FormControl(16, Validators.max([0,15]));
*
* console.log(control.errors); // {range: {min: 0, max: 15, actual: 16}}
* ```
*
* @returns A validator function that returns an error map with the
* `range` property if the validation check fails, otherwise `null`.
*
* @see `updateValueAndValidity()`
*
*/
    static match(value: string): ValidatorFn {
        return matchValidator(value);
    }
}


/**
 * Validator that requires the control's value to be between provided numbers.
 * See `Validators.range` for additional information.
 */
export function rangeValidator(range: Array<number>): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (isEmptyInputValue(control.value) || isEmptyInputValue(range) || range.length < 2) {
            return null;  // don't validate empty values to allow optional controls
        }
        const value = parseFloat(control.value);
        const max = range[0];
        const min = range[1];
        if (!isNaN(value) && (value < min || value > max)) {
            return { 'range': { 'min': min, 'max': max, 'actual': control.value } };
        }

        return null;
    };
}


export function matchValidator(input: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (isEmptyInputValue(control.value)) {
            return null;  // don't validate empty values to allow optional controls
        }

        const targetCtrl = control.get(input);
        let targetValue: any;
        if (!targetCtrl) {
            const el = document.getElementById(input) as any;
            if (el) {
                targetValue = el.value;
            } else {
                return null;
            }
        } else {
            targetValue = targetCtrl.value;
        }

        if (targetValue !== control.value) {
            return { 'mismatch': { 'requiredValue': targetValue, 'actual': control.value } };
        }
        return null;
    };
}