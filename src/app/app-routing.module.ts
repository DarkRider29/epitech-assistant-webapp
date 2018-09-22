import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ConnectionComponent} from './connection/connection.component';

const routes: Routes = [
  {path: '', redirectTo: '/connection', pathMatch: 'full'},
  {path: 'connection', component: ConnectionComponent}/*,
  {path: 'detail/:id', component: HeroDetailComponent},
  {path: 'heroes', component: HeroesComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
