import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseDescriptionComponent } from './student-course-description.component';

describe('StudentCourseDescriptionComponent', () => {
  let component: StudentCourseDescriptionComponent;
  let fixture: ComponentFixture<StudentCourseDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCourseDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCourseDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
