import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(FormsModule, ReactiveFormsModule),
    provideRouter([
      { path: 'login', loadComponent: () => import('./app/components/login/login.component').then(m => m.LoginComponent) },
      { path: 'book-list', loadComponent: () => import('./app/components/book-list/book-list.component').then(m => m.BookListComponent) },
      { path: 'quote-list', loadComponent: () => import('./app/components/quote-list/quote-list.component').then(m => m.QuoteListComponent) },
      { path: 'add-book', loadComponent: () => import('./app/components/book-form/book-form.component').then(m => m.BookFormComponent) },
      { path: 'edit-book/:id', loadComponent: () => import('./app/components/edit-book/edit-book.component').then(m => m.EditBookComponent) },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ])
  ]
});
