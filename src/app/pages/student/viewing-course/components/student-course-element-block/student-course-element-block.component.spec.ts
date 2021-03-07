import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseElementBlockComponent } from './student-course-element-block.component';

describe('StudentCourseElementBlockComponent', () => {
  let component: StudentCourseElementBlockComponent;
  let fixture: ComponentFixture<StudentCourseElementBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCourseElementBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCourseElementBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
