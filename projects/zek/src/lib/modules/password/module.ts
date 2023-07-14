import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZekPassword } from './password';
import { FormsModule } from '@angular/forms';
import { ValidatorModule } from '../validator';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ValidatorModule
    ],
    declarations: [
        ZekPassword,
    ],
    exports: [ZekPassword]
})
export class PasswordModule { }