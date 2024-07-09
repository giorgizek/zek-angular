import { HtmlHelper } from "../../utils";

declare let google: any;


declare global {
    interface Window {
        onGoogleLibraryLoad: () => void;
    }
}

function loadScript(
    onLoaded: (google: any) => void,
    url?: string,
    nonce?: string
): void {
    window.onGoogleLibraryLoad = () => {
        onLoaded(google);
    };

    const src = url || "https://accounts.google.com/gsi/client";
    HtmlHelper.loadScript(src, nonce, true, true);
}

export const loader = { loadScript };