import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent  implements OnInit {
  @Input() title: string;
  @Input() imgUrl: string;
  constructor() { }
  ngOnInit() {
    if(!this.imgUrl) {
      console.warn('Error: no image provided!');
    }
  }
}
