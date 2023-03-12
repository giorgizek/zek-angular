import { ModuleWithProviders, NgModule } from "@angular/core";
import { ReCaptchaConfig } from "./index";
import { RECAPTCHA_SITE_KEY } from "../../tokens";
import { ReCaptchaService } from "./recaptcha.service";

//4.2.0
@NgModule({
    providers: [ReCaptchaService]
})
export class RecaptchaModule {
    public static forRoot(config: ReCaptchaConfig): ModuleWithProviders<RecaptchaModule> {
        return {
            ngModule: RecaptchaModule,
            providers: [
                ReCaptchaService,
                {
                    provide: RECAPTCHA_SITE_KEY,
                    useValue: config.siteKey
                },
            ]
        };
    }

    public static forChild(config: ReCaptchaConfig) {
        return this.forRoot(config);
    }
}
