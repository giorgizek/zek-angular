import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BooleanInput, CoreUiComponent, NumberInput } from '../../components';
import { Convert, MathHelper } from '../../utils';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    selector: 'zek-tag',
    templateUrl: 'tag.html',
    styleUrl: 'tag.scss',
    host: {
        '[attr.id]': 'id',
    }
})
export class ZekTag extends CoreUiComponent {
    @Input() model!: string[] | null;
    @Output() readonly modelChange = new EventEmitter<string[]>();

    @Input()
    get max(): number {
        return this._max;
    }
    set max(v: NumberInput) {
        const tmp = MathHelper.clamp(Convert.toNumber(v) || 0, 0, 1000000000);
        if (this._max !== tmp) {
            this._max = tmp;
        }
    }
    _max: number = 1000000000;



    _maxlength: number | null = null;
    @Input()
    get maxlength(): number | null {
        return this._maxlength;
    }
    set maxlength(v: NumberInput) {
        const tmp = Convert.parseNumber(v);
        if (tmp !== null) {
            const num = MathHelper.clamp(tmp, 0, 1000000000);
            if (this._maxlength !== num) {
                this._maxlength = num;
            }
        }
        this._maxlength = tmp;
    }



    private _duplicate = false;
    @Input()
    get duplicate(): boolean {
        return this._duplicate;
    }
    set duplicate(v: BooleanInput) {
        this._duplicate = Convert.toBooleanProperty(v);
    }



    text: string | null = null;
    onKeyEnter(e: Event) {
        e.preventDefault();
        e.stopPropagation();


        if (this.add(this.text)) {
            this.text = null;
        }
    }

    private _uniqueId: string = `zek-tag-${this.uniqueId}`;
    /** The unique ID for the tag. */
    @Input() id: string = this._uniqueId;

    get inputId(): string {
        return `${this.id || this._uniqueId}-input`;
    }

    add(text: string | null) {
        if (!text) return false;

        let emitModel = false;
        if (!this.model) {
            this.model = [];
            emitModel = true;
        }

        const maxlength = (this.maxlength || 0);
        if (maxlength > 0 && text.length > maxlength) {
            return false;
        }

        if (!this.duplicate && this.model.includes(text)) {
            return false;
        }

        if (this.model.length >= this.max) {
            return false
        }

        this.model.push(text);
        if (emitModel) this.modelChange.emit(this.model);
        return true;
    }

    remove(item: string) {
        if (!this.model) return;

        const index = this.model.indexOf(item);
        if (index !== -1) {
            this.model.splice(index, 1);
        }
    }
}