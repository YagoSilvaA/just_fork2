import { NgModule } from '@angular/core';

import { IntranetRoutingModule } from './intranet-routing.module';
import { SharedModule } from '../core/shared/shared.module';

import { IntranetComponent } from './intranet.component';
import { MyComponent } from './user/container/user.component';
import { IntranetService } from './intranet.service';
import { PostRestaurantComponent } from './components/post-restaurant/post-restaurant.component';
import { MyRestaurantComponent } from './components/my-restaurant/my-restaurant.component';
import { PostMenusComponent } from './components/menu/components/post-menu/post-menu.component';
import { IntranetMenusComponent } from './components/menu/container/intranet-menu.component';
import { PatchMenusComponent } from './components/patch-menu/patch-menu.component';
import { GetMenusComponent } from './components/get-menu/get-menu.component';
import { PatchRestaurantComponent } from './components/patch-restaurant/patch-restaurant.component';
import { PedidoComponent } from './components/pedidos/components/select-restaurant-pedido/pedidos.component';
import { ShowPedidoComponent } from './components/pedidos/components/show-all-pedidos/show-pedidos.component';
import { NavComponentIntra } from './navbar/nav.component';


@NgModule({
    imports: [
      IntranetRoutingModule,
      SharedModule
    ],
    declarations: [
      IntranetComponent,
      MyComponent,
      PostRestaurantComponent,
      PedidoComponent,
      PostMenusComponent,
      PatchMenusComponent,
      MyRestaurantComponent,
      IntranetMenusComponent,
      GetMenusComponent,
      PatchRestaurantComponent,
      ShowPedidoComponent,
      NavComponentIntra
    ],
    providers: [
      IntranetService
    ]
  })
  export class IntranetModule {
    constructor() {}
  }
  