import { HtmlHelper } from "../../utils";
import { ReCaptchaV2 } from "./recaptcha.model";

declare var grecaptcha: ReCaptchaV2.ReCaptcha & {
    enterprise: ReCaptchaV2.ReCaptcha;
};

declare global {
    interface Window {
        recaptchaloaded: () => void;
    }
}
function loadScript(
    siteKey: "explicit" | string,
    onLoaded: (grecaptcha: ReCaptchaV2.ReCaptcha) => void,//ReCaptchaV2.ReCaptcha
    urlParams?: string,
    url?: string,
    nonce?: string
): void {
    window.recaptchaloaded = () => {
        onLoaded(grecaptcha);
    };

    const baseUrl = url || "https://www.google.com/recaptcha/api.js";
    const params = urlParams || '';
    const src = `${baseUrl}?render=${siteKey}&onload=recaptchaloaded${params}`;

    HtmlHelper.loadScript(src, nonce, true, true);
}

export const loader = { loadScript };