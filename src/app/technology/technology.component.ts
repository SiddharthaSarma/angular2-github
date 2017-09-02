import { NavbarComponent } from './../navbar/navbar.component';
import { TechnologyService } from './../technology.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css'],
  entryComponents: [NavbarComponent]
})
export class TechnologyComponent implements OnInit {
  technologies = [];
  constructor(
    private technologyService: TechnologyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.technologies = this.technologyService.getTechnologies();
  }

  getDetails(repo: string) {
    this.router.navigate(['/repos', repo]);
  }
}
