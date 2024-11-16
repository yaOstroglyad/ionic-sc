import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent  implements OnInit {
  @Input() title: string;
  @Input() imgUrl: string;
  @Input() description: string | SafeHtml;
  @Input() linkPath?: string;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (!this.imgUrl) {
      console.warn('Error: no image provided!');
    }

    // Санитизация HTML-контента
    if (this.description) {
      this.description = this.sanitizer.bypassSecurityTrustHtml(this.description as string);
    }
  }
}
