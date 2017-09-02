import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TechnologyComponent } from './technology/technology.component';
import { ReposComponent } from './repos/repos.component';
import { UsersComponent } from './users/users.component';
import { LoaderComponent } from './loader/loader.component';
import { routing } from './app.routes';

// Services
import { ApiService } from './api.service';
import { TechnologyService } from './technology.service';
import { NotificationsService } from 'angular2-notifications';

// External packages.
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';

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
    BrowserAnimationsModule,
    SimpleNotificationsModule,
    routing
  ],
  providers: [TechnologyService, ApiService, NotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
