import { ModuleWithProviders, NgModule } from '@angular/core';
import { WebApiClient } from './services';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
  ]
})
export class ZekModule { 
  public static forRoot(environment: any): ModuleWithProviders<ZekModule> {

    return {
        ngModule: ZekModule,
        providers: [
          WebApiClient,
            {
                provide: 'env',
                useValue: environment
            }
        ]
    };
  }
}