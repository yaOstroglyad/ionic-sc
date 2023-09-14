import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let $ = (e) => document.querySelector(e);

    let dots = $(".dots");
    function animate(element, className) {
      element.classList.add(className);
      setTimeout(() => {
        element.classList.remove(className);
        setTimeout(() => {
          animate(element, className);
        }, 500);
      }, 2500);
    }

    animate(dots, "dots--animate");
  }



}
