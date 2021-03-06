import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { WebApiClient, WebApiConfig } from './services';
import { API_BASE_URL } from './tokens';

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