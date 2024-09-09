import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchFlashcardsDialogComponent } from './fetch-flashcards-dialog.component';

describe('FetchFlashcardsDialogComponent', () => {
  let component: FetchFlashcardsDialogComponent;
  let fixture: ComponentFixture<FetchFlashcardsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FetchFlashcardsDialogComponent]
    });
    fixture = TestBed.createComponent(FetchFlashcardsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
