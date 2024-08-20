import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BookListComponent } from './book-list.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListComponent, CommonModule],
      providers: [provideHttpClientTesting()]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of books', () => {
    component.books = [
      { id: 1, title: 'Book 1', author: 'Author 1', publishDate: '2024-01-01' },
      { id: 2, title: 'Book 2', author: 'Author 2', publishDate: '2024-01-02' }
    ];
    fixture.detectChanges();

    const bookElements = fixture.debugElement.queryAll(By.css('.book-item'));
    expect(bookElements.length).toBe(2);
  });
});
