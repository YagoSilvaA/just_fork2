import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicComponent } from './public.component';
import { HomeComponent } from './home/containers/home.component';
import { AuthComponent } from './login/containers/auth.component';
import { MenuComponent } from './home/containers/menu/menu.component';


const routes: Routes = [
    {path: '', component: PublicComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'auth', component: AuthComponent },
        { path: 'menu/:id', component: MenuComponent },
        ]
    },
]

@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PublicRoutingModule{

}