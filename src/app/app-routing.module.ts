import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import {MovieDetailsComponent} from './components/movie-details/movie-details.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {MoviesResolver} from './movies.resolver';


const routes: Routes = [
  { path: '',
    component: MoviesComponent,
    resolve: {
     '': MoviesResolver
    }},
  { path: 'details/:id', component: MovieDetailsComponent },
  // { path: 'details', component: MovieDetailsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
