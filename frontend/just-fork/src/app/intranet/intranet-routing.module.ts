import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardGuard } from '../guards/admin-guard.guard';
import { PostRestaurantComponent } from './components/post-restaurant/post-restaurant.component';
import { IntranetComponent } from './intranet.component';
import { UserComponent } from './user/container/user.component';


const routes: Routes = [
    {path: '', component: IntranetComponent, children: [
        { path: '', redirectTo: 'user', pathMatch: 'full' },
        { path: 'user', component: UserComponent, canActivate: [AdminGuardGuard] },
        { path: 'postR', component: PostRestaurantComponent, canActivate: [AdminGuardGuard] }
        ]
    },
]

@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class IntranetRoutingModule{

}