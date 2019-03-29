import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokeDetailsComponent } from './poke-details/poke-details.component';
import { PokeListComponent } from './poke-list/poke-list.component';

const routes: Routes = [
  {path: 'pokemons', component: PokeListComponent},
  {path: 'pokemons/:id', component: PokeDetailsComponent},
  {path: '**', redirectTo: '/pokemons'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
