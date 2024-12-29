import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  openModal(modalComponent: any): NgbModalRef {
    const modalRef: NgbModalRef = this.modalService.open(modalComponent, {
      centered: true,
      size: 'lg',
    });
    return modalRef;
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
