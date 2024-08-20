import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlashcardsComponent } from './admin-flashcards.component';

describe('AdminFlashcardsComponent', () => {
  let component: AdminFlashcardsComponent;
  let fixture: ComponentFixture<AdminFlashcardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFlashcardsComponent]
    });
    fixture = TestBed.createComponent(AdminFlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
