import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.css',
})
export class AlertModalComponent {
  @Input() data: { title?: string; message?: string; icon?: string } = {};

  constructor(public activeModal: NgbActiveModal) {}

  closeModal(): void {
    this.activeModal.dismiss();
  }

  confirmAction(): void {
    this.activeModal.close('confirm');
  }
}
