import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BookService } from '../../../../shared/services/book-services/book.service';
import { Book } from '../../../../shared/interfaces/book';

@Component({
  selector: 'app-add-new-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-new-form.component.html',
  styleUrl: './add-new-form.component.css',
})
export class AddNewFormComponent {
  bookForm: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.bookForm = this.fb.group({
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
