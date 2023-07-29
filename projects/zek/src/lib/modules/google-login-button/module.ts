import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleLoginConfig, ZekGoogleLoginButton } from './google-login-button';
import { GOOGLE_CLIENT_ID } from '../../tokens';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ZekGoogleLoginButton
    ],
    exports: [
        ZekGoogleLoginButton
    ]
})
export class ZekGoogleLoginModule {
    public static forRoot(config: GoogleLoginConfig): ModuleWithProviders<ZekGoogleLoginModule> {
        return {
          ngModule: ZekGoogleLoginModule,
          providers: [
            ZekGoogleLoginButton,
            {
              provide: GOOGLE_CLIENT_ID,
              useValue: config.client_id
            },
          ]
        };
      }


    public static forChild(config: GoogleLoginConfig) {
        return this.forRoot(config);
    }
}