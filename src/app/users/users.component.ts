import { LoaderComponent } from './../loader/loader.component';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../api.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  entryComponents: [NavbarComponent, LoaderComponent]
})
export class UsersComponent implements OnInit {
  public user;
  public name;
  public repos = [];
  public loading = false;
  public options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    showProgressBar: false,
    maxStack: 1
  };
  private _sub;
  constructor(
    private _apiService: ApiService,
    private route: ActivatedRoute,
    private _notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    this._sub = this.route.params.subscribe(params => {
      this.name = params['name'];
      this.getUserDetails();
      this.getUserRepos();
    });
  }

  // Fetch user details.
  getUserDetails() {
    this.loading = true;
    this._apiService.fetchUserDetails(this.name).subscribe(
      response => {
        this.user = response;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this._notificationsService.error(
          'Some thing went wrong!',
          'Please try again later.'
        );
      }
    );
  }

  // Fetch the user's repos.
  getUserRepos() {
    this._apiService.fetchUserRepos(this.name).subscribe(
      response => {
        this.repos = response;
      },
      error => {
        this._notificationsService.error(
          'Some thing went wrong!',
          'Please try again later.'
        );
      }
    );
  }
}
