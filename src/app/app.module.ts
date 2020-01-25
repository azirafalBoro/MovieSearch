import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {StoreModule} from '@ngrx/store';

// import { EffectsModule } from '@ngrx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import {CarouselModule, ChipsModule, InputTextModule, ProgressBarModule, RatingModule} from 'primeng/primeng';
import { MoviesResultTablesComponent } from './components/movies-result-tables/movies-result-tables.component';
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { reducers, metaReducers } from './reducers';
import { reducer} from './movies.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

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
    ProgressBarModule,
    StoreModule.forRoot({filter: reducer}),
    // StoreModule.forRoot({}),
    // StoreModule.forRoot(reducers, {
    //   metaReducers,
    //   runtimeChecks: {
    //     strictStateImmutability: true,
    //     strictActionImmutability: true
    //   }
    // }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
