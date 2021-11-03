import { NgModule } from '@angular/core';

import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../core/shared/shared.module';

import { PublicComponent } from './public.component';
import { HomeComponent } from './home/containers/home.component';
import { PublicService } from './public.service';
import { AuthComponent } from './login/containers/auth.component';
import { MenuComponent } from './home/containers/menu/menu.component';
import { AdminLogComponent } from './login/components/admin/admin.component';
import { UserLogComponent } from './login/components/user/user.component';


@NgModule({
  imports: [
    PublicRoutingModule,
    SharedModule
  ],
  declarations: [
    PublicComponent,
    HomeComponent,
    AuthComponent,
    MenuComponent,
    AdminLogComponent,
    UserLogComponent
  ],
  providers: [
    PublicService
  ]
})
export class PublicModule {
  constructor() {}
}
