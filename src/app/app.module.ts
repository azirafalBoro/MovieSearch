import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import {CarouselModule, ChipsModule, InputTextModule, ProgressBarModule, RatingModule} from 'primeng/primeng';
import { MoviesResultTablesComponent } from './components/movies-result-tables/movies-result-tables.component';
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MoviesResultTablesComponent,
    MovieDetailsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InputTextModule,
    FormsModule,
    TableModule,
    ChipsModule,
    CarouselModule,
    RatingModule,
    ProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
