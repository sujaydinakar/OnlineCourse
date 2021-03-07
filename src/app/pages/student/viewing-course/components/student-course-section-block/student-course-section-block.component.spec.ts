import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseSectionBlockComponent } from './student-course-section-block.component';

describe('StudentCourseSectionBlockComponent', () => {
  let component: StudentCourseSectionBlockComponent;
  let fixture: ComponentFixture<StudentCourseSectionBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCourseSectionBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCourseSectionBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
