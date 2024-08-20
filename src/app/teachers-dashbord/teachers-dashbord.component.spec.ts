import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersDashbordComponent } from './teachers-dashbord.component';

describe('TeachersDashbordComponent', () => {
  let component: TeachersDashbordComponent;
  let fixture: ComponentFixture<TeachersDashbordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeachersDashbordComponent]
    });
    fixture = TestBed.createComponent(TeachersDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
