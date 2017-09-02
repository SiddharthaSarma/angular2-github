import { NavbarComponent } from './../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  entryComponents: [NavbarComponent]
})
export class UsersComponent implements OnInit {
  public user;
  public name;
  public repos = [];
  private _sub;
  constructor(private _apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this._sub = this.route.params.subscribe(params => {
      this.name = params['name'];
      this.getDetails(this.name);
      this.getUserRepos(this.name);
    });
  }

  getDetails(userName: string) {
    this._apiService
      .fetchUserDetails(userName)
      .subscribe(response => (this.user = response));
  }

  getUserRepos(userName: string) {
    this._apiService
      .fetchUserRepos(userName)
      .subscribe(response => (this.repos = response));
  }
}
