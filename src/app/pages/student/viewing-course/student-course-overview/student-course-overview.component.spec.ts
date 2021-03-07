import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseOverviewComponent } from './student-course-overview.component';

describe('StudentCourseOverviewComponent', () => {
  let component: StudentCourseOverviewComponent;
  let fixture: ComponentFixture<StudentCourseOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCourseOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCourseOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
