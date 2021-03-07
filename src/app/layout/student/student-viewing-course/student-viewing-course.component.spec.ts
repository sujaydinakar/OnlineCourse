import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewingCourseComponent } from './student-viewing-course.component';

describe('StudentViewingCourseComponent', () => {
  let component: StudentViewingCourseComponent;
  let fixture: ComponentFixture<StudentViewingCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewingCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewingCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
