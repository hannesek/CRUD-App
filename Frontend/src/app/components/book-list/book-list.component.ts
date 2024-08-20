import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Book {
  id: number;
  title: string;
  author: string;
  publishDate: string;
}

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  console: any;

  constructor(private http: HttpClient, private router: Router) {}

  navigateToAddBook(): void {
    console.log('Add Book clicked!');
    this.router.navigate(['/add-book']);
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Book[]>('http://localhost:5283/api/books', {headers})
      .subscribe(data => {
        this.books = data;
      });
  }

  deleteBook(id: number): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete(`http://localhost:5283/api/books/${id}`, {headers})
      .subscribe(() => {
        this.books = this.books.filter(book => book.id !== id);
      });
  }

  editBook(id: number): void {
    this.router.navigate([`/edit-book/${id}`]);
  }

  formatDate(date: string): string {
    return date.split('T')[0];
  }
}
