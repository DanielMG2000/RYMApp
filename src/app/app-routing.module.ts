import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { CharacterComponent } from './components/character/character.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FavoritesExistGuard } from './guards/favorites-exist.guard';

const routes: Routes = [
  {path: 'home', component: CardsComponent},
  {path: 'character/:id', component: CharacterComponent},
  {path: 'favorites', component: FavoritesComponent, canActivate: [FavoritesExistGuard]},
  {path: '**', pathMatch: 'full', component: CardsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
