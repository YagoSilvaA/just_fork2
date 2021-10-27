import { NgModule } from '@angular/core';

import { IntranetRoutingModule } from './intranet-routing.module';
import { SharedModule } from '../core/shared/shared.module';

import { IntranetComponent } from './intranet.component';
import { UserComponent } from './user/container/user.component';
import { IntranetService } from './intranet.service';
import { PostRestaurantComponent } from './components/post-restaurant/post-restaurant.component';


@NgModule({
    imports: [
      IntranetRoutingModule,
      SharedModule
    ],
    declarations: [
      IntranetComponent,
      UserComponent,
      PostRestaurantComponent
    ],
    providers: [
      IntranetService
    ]
  })
  export class IntranetModule {
    constructor() {}
  }
  