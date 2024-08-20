import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinExamComponent } from './join-exam.component';

describe('JoinExamComponent', () => {
  let component: JoinExamComponent;
  let fixture: ComponentFixture<JoinExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinExamComponent]
    });
    fixture = TestBed.createComponent(JoinExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
