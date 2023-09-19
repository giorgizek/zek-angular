import { Component } from "@angular/core";
import { ZekGridToolbar } from "../grid-toolbar/grid-toolbar";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    standalone: true,
    selector: 'zek-grid-toolbar-bar',
    templateUrl: './grid-toolbar-bar.html',
    imports: [CommonModule, TranslateModule]
})
export class ZekGridToolbarBar extends ZekGridToolbar {

}