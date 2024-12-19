import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ComicService } from '../../../../shared/services/comic-services/comic.service';
import { Comic } from '../../../../shared/interfaces/comic';

@Component({
  selector: 'app-add-new-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-new-form.component.html',
  styleUrl: './add-new-form.component.css',
})
export class AddNewFormComponent {
  comicForm: FormGroup;

  constructor(private fb: FormBuilder, private comicService: ComicService) {
    this.comicForm = this.fb.group({
      title: ['', Validators.required],
      isbn: ['', Validators.required],
      yearPublished: ['', Validators.required],
      genre: ['', Validators.required],
      summary: ['', Validators.required],
      authorName: ['', Validators.required],
      bookImg: ['', Validators.required],
    });
  }

  onSubmit(): void {}
}
