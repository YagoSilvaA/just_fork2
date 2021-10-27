import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { JWTInterceptorInterceptor } from 'src/app/interceptor/jwtinterceptor.interceptor';



@NgModule({
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    NotFoundComponent
  ],
  exports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NotFoundComponent
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptorInterceptor,
      multi: true
    }
  ]
})
export class SharedModule {
  constructor() {}
}
