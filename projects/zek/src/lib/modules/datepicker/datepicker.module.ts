import { ModuleWithProviders, NgModule } from '@angular/core';
import { DATE_FORMAT, LANGUAGE } from '../../tokens';
import { DateValueAccessor } from './date-value-accessor';

export interface DatepickerConfig {
  dateFormat: string;
  language: string;
}

@NgModule({
  declarations: [DateValueAccessor],
  exports: [DateValueAccessor]
})
export class DatepickerModule {
  public static forRoot(config: DatepickerConfig, environment?: any | null): ModuleWithProviders<DatepickerModule> {

    return {
      ngModule: DatepickerModule,
      providers: [
        DateValueAccessor,
        { provide: DATE_FORMAT, useValue: config.dateFormat },
        { provide: LANGUAGE, useValue: config.language },
        { provide: 'env', useValue: environment }
      ]
    };
  }

  public static forChild(config: DatepickerConfig, environment?: any | null) {
    return this.forRoot(config, environment);
  }
}