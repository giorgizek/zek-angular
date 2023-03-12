import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './password.component';
import { FormsModule } from '@angular/forms';
import { ValidatorModule } from '../validator';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ValidatorModule
    ],
    declarations: [
        PasswordComponent,
    ],
    exports: [PasswordComponent]
})
export class PasswordModule { }