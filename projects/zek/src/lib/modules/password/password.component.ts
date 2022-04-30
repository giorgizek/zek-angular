import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'zek-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent {
  @Input() name = 'Password';
  @Input() required = false;
  @Input() minlength: number | string | null = null;
  @Input() maxlength: number | string | null = null;

  @Input() model?: string | null;
  @Output('modelChange') onChange = new EventEmitter();

  private _type = 'password';
  get type() {
    return this._type;
  }

  showHide() {
    this._type = this._type === 'password' ? 'text' : 'password';
  }
}