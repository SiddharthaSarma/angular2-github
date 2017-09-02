import { LoaderComponent } from './../loader/loader.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from './../api.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
  entryComponents: [NavbarComponent, LoaderComponent]
})
export class ReposComponent implements OnInit {
  public repos: any = {
    items: false
  };
  public options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    showProgressBar: false
  };
  public loading = false;
  public pageLength = 9;
  public pageNumber = 1;
  public maxPageNumber = 0;
  public name: string;
  public pagesArray: any[];
  public filterParam = 'stars';
  public filterOrder = 'desc';
  public filterObject = {
    1: {
      filterParam: '',
      filterOrder: ''
    },
    2: {
      filterParam: 'stars',
      filterOrder: 'desc'
    },
    3: {
      filterParam: 'stars',
      filterOrder: 'asc'
    },
    4: {
      filterParam: 'forks',
      filterOrder: 'desc'
    },
    5: {
      filterParam: 'forks',
      filterOrder: 'asc'
    }
  };
  public sortValue = 2;
  private _sub;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private _router: Router,
    private _notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    this._sub = this.route.params.subscribe(params => {
      this.name = params['name'];
      this.fetchRepos();
    });
  }

  // Fetch repos based on technology
  fetchRepos() {
    this.loading = true;
    this.apiService
      .fetchReposBasedOnTechnology(
        this.name,
        this.pageNumber,
        this.pageLength,
        this.filterParam,
        this.filterOrder
      )
      .subscribe(
        data => {
          this.repos = data.response;
          this.loading = false;
          if (this.pageNumber === 1) {
            this.calculatePageNumber(data.headers.get('link'));
          }
        },
        error => {
          this.loading = false;
          this.repos = {
            items: false
          };
          this._notificationsService.error(
            'Some thing went wrong!',
            'Please try again later.'
          );
        }
      );
  }

  // Calculate the pageNumber.
  calculatePageNumber(url: string) {
    const urls: Array<string> = url.split(';');
    for (let i = 0; i < urls.length; i++) {
      if (urls[i] === ' rel="last"') {
        this.maxPageNumber = this.getParams(urls[i - 1].split(',')[1]).page;
        break;
      }
    }
    this.adjustPageNumbers();
  }

  // Push the page numbers into array.
  adjustPageNumbers() {
    const pages = [];
    for (let i = 1; i <= this.maxPageNumber; i++) {
      pages.push(i);
    }
    this.pagesArray = pages;
  }

  // will return the query params from the url.
  getParams(query) {
    if (!query) {
      return {};
    }
    return (/^[?#]/.test(query) ? query.slice(1) : query)
      .split('&')
      .reduce((params, param) => {
        const [key, value] = param.split('=');
        params[key] = value
          ? decodeURIComponent(value.replace(/\+/g, ' '))
          : '';
        return params;
      }, {});
  }

  // Get owner details.
  getOwnerDetails(value: string, event) {
    if (event) {
      // prevent the page to refresh.
      event.preventDefault();
    }
    this._router.navigate(['/users', value]);
  }

  // Catch the page change event and fetch the latest repos.
  pageChanged(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.fetchRepos();
    window.scrollTo(0, 0);
  }

  // Handle the filter and search actions.
  search(searchInput) {
    const selectedItem = this.filterObject[this.sortValue];
    this.filterParam = selectedItem.filterParam;
    this.filterOrder = selectedItem.filterOrder;
    this.pageNumber = 1;
    if (searchInput) {
      this.name = searchInput;
    }
    this.fetchRepos();
  }
}
