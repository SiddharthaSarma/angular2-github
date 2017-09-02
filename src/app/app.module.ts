import { ApiService } from './api.service';
import { TechnologyService } from './technology.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TechnologyComponent } from './technology/technology.component';
import { ReposComponent } from './repos/repos.component';
import { UsersComponent } from './users/users.component';
import { routing } from './app.routes';

import {NgxPaginationModule} from 'ngx-pagination';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TechnologyComponent,
    ReposComponent,
    UsersComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    routing
  ],
  providers: [TechnologyService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
