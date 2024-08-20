import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookForm: FormGroup;
  bookId: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishDate: ['', Validators.required]
    });

    this.bookId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadBook();
  }

  loadBook(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(`http://localhost:5283/api/books/${this.bookId}`, {headers})
      .subscribe((book: any) => {
        book.publishDate = book.publishDate.split('T')[0];
        this.bookForm.patchValue(book);
      });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const formattedDate = new Date(this.bookForm.value.publishDate).toISOString().split('T')[0];
      const updatedBook = { ...this.bookForm.value, id: this.bookId, publishDate: formattedDate }; // Se till att id skickas med
      const url = `http://localhost:5283/api/books/${this.bookId}`;
      this.http.put(url, updatedBook, {headers})
          .subscribe(() => {
              this.router.navigate(['/book-list']);
          });
    }
  }

}
