import { NgModule } from '@angular/core';

import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../core/shared/shared.module';

import { PublicComponent } from './public.component';
import { HomeComponent } from './home/containers/home.component';
import { PublicService } from './public.service';
import { AuthComponent } from './login/containers/auth.component';
import { LoginComponent } from './login/components/Login/login.component';
import { RegisterComponent } from './login/components/Register/register.component';


@NgModule({
  imports: [
    PublicRoutingModule,
    SharedModule
  ],
  declarations: [
    PublicComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    PublicService
  ]
})
export class PublicModule {
  constructor() {}
}
