import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  apiUrl = `https://api.github.com/search/repositories?q=`;
  userDetailsUrl = 'https://api.github.com/users/';
  constructor(private http: Http) {}

  fetchReposBasedOnTechnology(
    technology: string,
    page: number,
    pageLength: number,
    sort: string,
    order: string
  ) {
    return this.http
      .get(
        `${this.apiUrl +
          technology}&language=${technology}&sort=${sort}&page=${page}&per_page=${pageLength}&order=${order}`
      )
      .map(response => {
        return {
          response: response.json(),
          headers: response.headers
        };
      });
  }

  fetchUserDetails(user: string) {
    return this.http
      .get(this.userDetailsUrl + user)
      .map(response => response.json());
  }

  fetchUserRepos(user: string) {
    return this.http
      .get(this.userDetailsUrl + user + '/repos')
      .map(response => response.json());
  }
}
