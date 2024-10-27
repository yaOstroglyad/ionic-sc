import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-pagination-control',
  templateUrl: './pagination-control.component.html',
  styleUrls: ['./pagination-control.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf
  ]
})
export class PaginationControlComponent {
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() totalPages: number = 1;
  public currentPage: number = 1;

  public get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.emitPageChange();
    }
  }

  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.emitPageChange();
    }
  }

  public goToPage(page: number): void {
    this.currentPage = page;
    this.emitPageChange();
  }

  private emitPageChange(): void {
    this.pageChange.emit(this.currentPage);
  }
}
