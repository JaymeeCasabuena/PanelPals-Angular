import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal-service/modal.service';
import { EditProfileFormComponent } from '../../../../modules/profile/edit-profile-form/edit-profile-form.component';
import { Avatar } from 'primeng/avatar';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [Avatar],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
})
export class AvatarComponent {
  constructor(private modalService: ModalService) {}

  openModal() {
    const modalRef = this.modalService.openModal(EditProfileFormComponent);
    modalRef.componentInstance.data = { sampleData: 'Test Data' };
  }
}
