import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ComicService } from '../../../../shared/services/comic-services/comic.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { ComicStatus } from '../../../../shared/enums/status.enum';

@Component({
  selector: 'app-add-new-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MultiSelectModule],
  templateUrl: './add-new-form.component.html',
  styleUrl: './add-new-form.component.css',
})
export class AddNewFormComponent {
  objectKeys = Object.keys;
  comicForm: FormGroup;
  genres: any;
  comicStatus = ComicStatus;
  status: any;

  constructor(private fb: FormBuilder, private comicService: ComicService) {
    this.comicForm = this.fb.group({
      title: ['', Validators.required],
      status: [ComicStatus.Ongoing, Validators.required],
      link: ['', Validators.required],
      yearPublished: ['', Validators.required],
      genres: ['', Validators.required],
      summary: ['', Validators.required],
      authorName: ['', Validators.required],
      cover: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchAllGenres();
  }

  fetchAllGenres(): void {
    this.comicService.getAllGenres().subscribe({
      next: (response) => (this.genres = response),
      error: (error) => console.error('Error fetching genres', error),
      complete: () => console.log('Fetching genres complete'),
    });
  }

  onSubmit(): void {
    if (this.comicForm.valid) {
      const comicData = this.comicForm.value;

      this.comicService.addComic(comicData).subscribe({
        next: (response) => console.log('Comic added successfully', response),
        error: (error) => console.error('Error adding comic', error),
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
