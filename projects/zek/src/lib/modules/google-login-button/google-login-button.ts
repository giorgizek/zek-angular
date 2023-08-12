import { Directive, EventEmitter, Inject, Input, Output } from "@angular/core";
import { loader } from './loader';
import { GOOGLE_CLIENT_ID } from "../../tokens";
import { CoreComponent, BooleanInput, StringInput, NumberInput } from "../../components";
import { Convert } from "../../utils";

declare let google: any;


export interface GoogleLoginConfig {
    client_id: string;
}


@Directive({
    selector: 'zek-google-login',
})
export class ZekGoogleLoginButton extends CoreComponent {
    constructor(@Inject(GOOGLE_CLIENT_ID) private readonly client_id: string) {
        super();
    }
    private _prompt: boolean = true;
    @Input() get prompt() {
        return this._prompt;
    }
    set prompt(v: BooleanInput) {
        this._prompt = Convert.toBooleanProperty(v);
    }

    private _width: NumberInput;
    @Input() get width() {
        return this._width;
    }
    set width(v: NumberInput) {
        this._width = v;
    }




    @Output() onLoginResponse = new EventEmitter();
    @Output() onLogin = new EventEmitter();

    private _buttonContainer = 'google-login-container';
    @Input() get buttonContainer() {
        return this._buttonContainer;
    }
    set buttonContainer(v: StringInput) {
        if (!v)
            throw new Error('buttonContainer is required');
        this._buttonContainer = v;
    }

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
            }
        });

        this.renderButton();
        this.autoPrompt();
    }
    renderButton() {
        let options: any = { theme: "outline", size: "large" };
        if (this._width)
            options.width = this._width;

            
        this.google.accounts.id.renderButton(
            document.getElementById(this._buttonContainer),
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