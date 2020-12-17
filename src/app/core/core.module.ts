import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { ApiService } from './services.ts/api.service';
import { StateService } from './services.ts/state.service';
import { HandleHttpErrorInterceptor } from './interceptors/handle-http-error.interceptor';
import { UiMetaService } from './services.ts/ui-meta.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [HttpClientModule],
  declarations: [],
  providers: [
    ApiService ,
    StateService,
    UiMetaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleHttpErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  // Ensure that CoreModule is only loaded into AppModule
  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
