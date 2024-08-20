import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamifiedExamComponent } from './gamified-exam.component';

describe('GamifiedExamComponent', () => {
  let component: GamifiedExamComponent;
  let fixture: ComponentFixture<GamifiedExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamifiedExamComponent]
    });
    fixture = TestBed.createComponent(GamifiedExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
