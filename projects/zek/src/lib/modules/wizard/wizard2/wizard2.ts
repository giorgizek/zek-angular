import { Component } from "@angular/core";
import { ZekWizard } from "../wizard/wizard";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    selector: 'zek-wizard2',
    templateUrl: './wizard2.html',
    imports: [CommonModule]
})
export class ZekWizard2 extends ZekWizard{

}