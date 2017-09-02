import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "./../api.service";
import { Component, OnInit } from "@angular/core";

import { NavbarComponent } from "../navbar/navbar.component";
@Component({
  moduleId: module.id,
  selector: "app-repos",
  templateUrl: "./repos.component.html",
  styleUrls: ["./repos.component.css"],
  entryComponents: [NavbarComponent]
})
export class ReposComponent implements OnInit {
  public repos = [];
  public pageLength = 9;
  public totalRecords = 0;
  public name: string;
  private _sub;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._sub = this.route.params.subscribe(params => {
      this.name = params["name"];
      this.fetchRepos(this.name);
    });
  }

  fetchRepos(name: string) {
    this.apiService
      .fetchReposBasedOnTechnology(name)
      .subscribe(response => (this.repos = response));
  }

  getOwnerDetails(value) {
    console.log(value);
    this._router.navigate(["/users", value]);
  }
}
