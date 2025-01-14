import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  @Input() first: number = 0;
  @Input() rows: number = 0;
  @Input() data: any;
  @Output() visibleContentChange = new EventEmitter<any[]>();

  constructor() {}

  get totalPages(): number[] {
    return Array(Math.ceil(this.data.length / this.rows))
      .fill(0)
      .map((_, i) => i);
  }

  prevPage(): void {
    if (this.first > 0) {
      this.first -= this.rows;
      this.updateVisibleContent();
    }
  }

  nextPage(): void {
    if (this.first + this.rows < this.data.length) {
      this.first += this.rows;
      this.updateVisibleContent();
    }
  }

  goToPage(pageIndex: number): void {
    this.first = pageIndex * this.rows;
    this.updateVisibleContent();
  }

  updateVisibleContent(): void {
    const visibleContent = this.data.slice(this.first, this.first + this.rows);
    this.visibleContentChange.emit(visibleContent);
  }
}
