import { AfterViewInit, Directive, ElementRef } from "@angular/core";
import { CoreComponent } from "../../components";

declare let bootstrap: any;

@Directive({
    standalone: true,
    selector: '[zek-toltip]'
})
export class ZekTooltip extends CoreComponent implements AfterViewInit {
    private _tooltip: any;
    constructor(private el: ElementRef) {
        super();
    }

    override destroy() {
        this._tooltip?.dispose();
        this._tooltip = undefined;
        return super.destroy();
    }

    ngAfterViewInit() {
        this._tooltip = new bootstrap.Tooltip(this.el.nativeElement);
    }

}