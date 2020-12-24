import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCreatingCourseComponent } from './instructor-creating-course.component';

describe('InstructorCreatingCourseComponent', () => {
  let component: InstructorCreatingCourseComponent;
  let fixture: ComponentFixture<InstructorCreatingCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorCreatingCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorCreatingCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
