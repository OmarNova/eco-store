import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './views/login/login.component';
import {RegisterComponent} from './views/register/register.component';
import {IndexComponent} from './views/index/index.component';
import {CartComponent} from './views/cart/cart.component';
import {FavoritosComponent} from './views/favoritos/favoritos.component';

const routes: Routes = [
  {path:'', redirectTo:'index' , pathMatch:'full'},
  {path:'index', component:IndexComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'cart', component:CartComponent},
  {path:'favoritos', component:FavoritosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,RegisterComponent,IndexComponent,CartComponent]