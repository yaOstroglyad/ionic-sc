import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public isData = false;

  constructor() {}

  updateView() {
    this.isData = !this.isData;
  }
}
