import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component"
import {MarketComponent} from "./market/market.component";

const routes: Routes = [
  {path: '', component: MarketComponent},
  {path: 'login', component: LoginComponent},
  {path: 'market', component: MarketComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
