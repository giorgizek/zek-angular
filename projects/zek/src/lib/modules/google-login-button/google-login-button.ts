import { Component, Directive, EventEmitter, Inject, Input, Output } from "@angular/core";
import { loader } from './loader';
import { GOOGLE_CLIENT_ID } from "../../tokens";
import { CoreComponent, BooleanInput, NumberInput } from "../../components";
import { Convert } from "../../utils";

declare let google: any;
let uniqueId = 0;

export interface GoogleLoginConfig {
    client_id: string;
}
export type GoogleLoginButtonTextInput =
    'signin_with' | 'signup_with' | 'continue_with' | 'signin' | null | undefined;


@Directive({
    selector: 'zek-google-login',
    host: {
        '[attr.id]': 'id',
    }
})
export class ZekGoogleLoginButton extends CoreComponent {
    constructor(@Inject(GOOGLE_CLIENT_ID) private readonly client_id: string) {
        super();
    }

    private _uniqueId: string = `zek-google-button-container-${++uniqueId}`;
    @Input() id: string = this._uniqueId;

    private _prompt: boolean = true;
    @Input() get prompt() {
        return this._prompt;
    }
    set prompt(v: BooleanInput) {
        this._prompt = Convert.toBooleanProperty(v);
    }

    private _autoSelect: boolean = false;
    @Input() get autoSelect() {
        return this._autoSelect;
    }
    set autoSelect(v: BooleanInput) {
        this._autoSelect = Convert.toBooleanProperty(v);
    }


    private _cancelOnTapOutside: boolean = true;
    @Input() get cancelOnTapOutside() {
        return this._cancelOnTapOutside;
    }
    set cancelOnTapOutside(v: BooleanInput) {
        this._cancelOnTapOutside = Convert.toBooleanProperty(v);
    }


    private _width: NumberInput;
    @Input() get width() {
        return this._width;
    }
    set width(v: NumberInput) {
        this._width = v;
    }


    private _text: GoogleLoginButtonTextInput;
    @Input() get text() {
        return this._text;
    }
    set text(v: GoogleLoginButtonTextInput) {
        this._text = v;
    }



    @Output() onLoginResponse = new EventEmitter();
    @Output() onLogin = new EventEmitter();

    // private _type: 'standard' | 'icon';
    // public get type(): '' {
    //     return this._type;
    // }
    // public set type(v: 'standard' | 'icon') {
    //     this._type = v;
    // }




    // private static _loaded = false;
    // static async loadScript() {
    //     if (this._loaded) return;
    //     await HtmlHelper.loadScripts('https://accounts.google.com/gsi/client');
    //     this._loaded = true;
    // }


    private google?: any;
    override async init() {
        super.init();
        // await GoogleLoginButton.loadScript();

        if ("google" in window) {
            this.google = google;
            this.initialize();
        } else {
            loader.loadScript(this.onLoadComplete);
        }
    }
    private onLoadComplete = (google: any) => {
        this.google = google;
        this.initialize();
    }

    initialize() {
        this.google.accounts.id.initialize({
            client_id: this.client_id,
            callback: (response: any) => {
                this.handleCredentialResponse(response);
            },
            auto_select: this._autoSelect,
            cancel_on_tap_outside: this._cancelOnTapOutside,
        });

        setTimeout(() => {
            this.renderButton();
            this.autoPrompt();
        },);
    }
    renderButton() {
        let options: any = { theme: "outline", size: "large" };
        if (this._width)
            options.width = this._width;
        if (this._text)
            options.text = this._text

        this.google.accounts.id.renderButton(
            document.getElementById(this.id),
            // this._elementRef.nativeElement.parentElement,
            options  // customization attributes
        );
    }
    autoPrompt() {
        if (this._prompt)
            this.google.accounts.id.prompt(); // also display the One Tap dialog
    }


    handleCredentialResponse(response: any) {
        this.onLoginResponse?.emit(response);
        this.onLogin?.emit(response.credential);

        // let payload = JwtHelper.decode(response.credential);
        // console.log("ID: " + payload.sub);
        // console.log('Full Name: ' + payload.name);
        // console.log('Given Name: ' + payload.given_name);
        // console.log('Family Name: ' + payload.family_name);
        // console.log("Image URL: " + payload.picture);
        // console.log("Email: " + payload.email);
    }
}