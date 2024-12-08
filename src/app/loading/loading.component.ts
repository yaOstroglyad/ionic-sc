import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PageWrapperModule } from '../shared/page-wrapper/page-wrapper.module';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports: [
    TranslateModule,
    PageWrapperModule
  ],
  standalone: true
})
export class LoadingComponent implements OnInit {
  @Input() message: string;
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
      }, 3000);
    }

    animate(dots, "dots--animate");
  }



}
