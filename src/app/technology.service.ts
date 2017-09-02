import { Injectable } from '@angular/core';
import { TECHNOLOGIES } from './technology/techonologies';

@Injectable()
export class TechnologyService {

  constructor() { }

  getTechnologies() {
    return TECHNOLOGIES;
  }
}
