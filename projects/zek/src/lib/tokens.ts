import { InjectionToken } from "@angular/core";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
export const DATE_FORMAT = new InjectionToken<string>('DATE_FORMAT');
export const LANGUAGE = new InjectionToken<string>('LANGUAGE');
export const RECAPTCHA_SITE_KEY = new InjectionToken<string>('RECAPTCHA_SITE_KEY');
export const GOOGLE_CLIENT_ID = new InjectionToken<string>('GOOGLE_CLIENT_ID');