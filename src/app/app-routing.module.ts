import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import {MovieDetailsComponent} from './components/movie-details/movie-details.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {MoviesResolver} from './movies.resolver';
import {MoviesResultTablesComponent} from './components/movies-result-tables/movies-result-tables.component';


const routes: Routes = [
  { path: '',
    component: MoviesComponent,
    resolve: {
     '': MoviesResolver
    }},
  { path: 'details/:id', component: MovieDetailsComponent },
  { path: 'table', component: MoviesResultTablesComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
