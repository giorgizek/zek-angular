import { ModuleWithProviders, NgModule } from '@angular/core';
import { DateValueAccessor } from './date-value-accessor';

@NgModule({
  declarations: [DateValueAccessor],
  exports: [DateValueAccessor]
})
export class DateValueAccessorModule { 
  public static forRoot(environment: any): ModuleWithProviders<DateValueAccessorModule> {

    return {
        ngModule: DateValueAccessorModule,
        providers: [
          DateValueAccessor,
            {
                provide: 'env',
                useValue: environment
            }
        ]
    };
  }
}