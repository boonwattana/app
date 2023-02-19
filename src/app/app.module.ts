import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoModule } from './shared/component/demo/demo.module';
import { MInputTextComponent } from './shared/widgets/m-input-text/m-input-text.component';
import { MInputText13Component } from './shared/widgets/m-input-text13/m-input-text13.component';
import { MInputTextAreaComponent } from './shared/widgets/m-input-text-area/m-input-text-area.component';
import { BaseComponent } from './shared/component/base/base.component';
import { BaseListComponent } from './shared/component/base-list/base-list.component';
import { BaseItemComponent } from './shared/component/base-item/base-item.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import { SharedWidgetModule } from './shared/widgets/shared-widget.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { setAppInjector } from './app-injector';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthenService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth.guard';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { T01Component } from './test/t01/t01.component';

export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, 
    '../assets/i18n/','.json'  );
}
@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    BaseListComponent,
    BaseItemComponent,
    T01Component 

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    CommonModule,
    FormsModule,
    SharedWidgetModule,
    DemoModule,
    TranslateModule.forRoot({
      defaultLanguage:'th-TH',
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ConfirmationService, 
    MessageService,
    AuthenService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
 }
