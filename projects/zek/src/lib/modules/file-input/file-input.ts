import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileService } from '../../services/file.service';
import { CoreUiComponent } from '../../components/core-ui.component';
import { BooleanInput } from '../../components/types';
import { Convert } from '../../utils/convert';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    selector: 'zek-file-input',
    templateUrl: 'file-input.html',
    styleUrl: 'file-input.scss',
    providers: [FileService],
    host: {
        '[attr.id]': 'id',
    }
})
export class ZekFileInput extends CoreUiComponent {
    // @Input() model!: string[] | null;
    @Output() readonly onUpload = new EventEmitter<Array<any>>();

    private readonly fileService = inject(FileService);

    private _uniqueId: string = `zek-file-input-${this.uniqueId}`;
    /** The unique ID for the tag. */
    @Input() id: string = this._uniqueId;

    get inputId(): string {
        return `${this.id || this._uniqueId}-input`;
    }

    private _accept = '*';
    public get accept(): string {
        return this._accept;
    }
    @Input()
    set accept(v: string | null | undefined) {
        if (!v)
            this._accept = '*';
        else
            this._accept = v;
    }


    private _multiple = false;
    @Input()
    get multiple(): boolean {
        return this._multiple;
    }
    set multiple(v: BooleanInput) {
        this._multiple = Convert.toBooleanProperty(v);
    }

    // files: File[] | null = null;

    clickInput() {
        const el = document.getElementById(this.inputId);
        if (el) {
            el.click();
        }
    }

    async onFileInputChange(event: any) {
        event.preventDefault();
        event.stopPropagation();

        const files = event?.target?.files;
        if (Array.isArray(!files)) return;

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            formData.append('files', file, file.name);
        }
        this.fileService.save(formData).subscribe(data => {
            if (data?.success) {
                this.onUpload.emit(data.value);
            }
        })
    }
}