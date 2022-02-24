import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { ReCaptchaConfig, ReCaptchaService, WebApiClient, WebApiConfig } from './services';
import { API_BASE_URL, SITE_KEY } from './tokens';

export class AppBaseModule {
    static injector: Injector;

    constructor(injector: Injector) {
        AppBaseModule.injector = injector;
    }
}

@NgModule()
export class WebApiModule {
  public static forRoot(config: WebApiConfig): ModuleWithProviders<WebApiModule> {
    return {
      ngModule: WebApiModule,
      providers: [
        WebApiClient,
        {
          provide: API_BASE_URL,
          useValue: config.baseUrl
        },
      ]
    };
  }

  public static forChild(config: WebApiConfig) {
    return this.forRoot(config);
  }
}



@NgModule()
export class RecaptchaModule {
  public static forRoot(config: ReCaptchaConfig): ModuleWithProviders<RecaptchaModule> {
    return {
      ngModule: RecaptchaModule,
      providers: [
        ReCaptchaService,
        {
          provide: SITE_KEY,
          useValue: config.siteKey
        },
      ]
    };
  }

  public static forChild(config: ReCaptchaConfig) {
    return this.forRoot(config);
  }
}
