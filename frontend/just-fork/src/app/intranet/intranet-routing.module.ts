import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardGuard } from '../guards/admin-guard.guard';
import { GetMenusComponent } from './components/get-menu/get-menu.component';
import { IntranetMenusComponent } from './components/menu/container/intranet-menu.component';
import { MyRestaurantComponent } from './components/my-restaurant/my-restaurant.component';
import { PatchMenusComponent } from './components/patch-menu/patch-menu.component';
import { PatchRestaurantComponent } from './components/patch-restaurant/patch-restaurant.component';
import { PedidoComponent } from './components/pedidos/components/select-restaurant-pedido/pedidos.component';
import { ShowPedidoComponent } from './components/pedidos/components/show-all-pedidos/show-pedidos.component';
import { PostRestaurantComponent } from './components/post-restaurant/post-restaurant.component';
import { IntranetComponent } from './intranet.component';
import { UserComponent } from './user/container/user.component';


const routes: Routes = [
    {path: '', component: IntranetComponent, children: [
        { path: '', redirectTo: 'user', pathMatch: 'full' },
        { path: 'user', component: UserComponent, canActivate: [AdminGuardGuard]},
        { path: 'postR', component: PostRestaurantComponent, canActivate: [AdminGuardGuard] },
        { path: 'patchR', component: PatchRestaurantComponent, canActivate: [AdminGuardGuard] },
        { path: 'mis-pedidos', component: PedidoComponent, canActivate: [AdminGuardGuard] },
        { path: 'mi-restaurante', component: MyRestaurantComponent, canActivate: [AdminGuardGuard] },
        { path: 'mis-menus', component: IntranetMenusComponent, canActivate: [AdminGuardGuard] },
        { path: 'all-menus', component: GetMenusComponent, canActivate: [AdminGuardGuard] },
        { path: 'patch-menus/:id', component: PatchMenusComponent, canActivate: [AdminGuardGuard] },
        { path: 'mostrar-pedido/:id', component: ShowPedidoComponent, canActivate: [AdminGuardGuard] },
        ]
    },
]

@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ]
})
export class IntranetRoutingModule{

}