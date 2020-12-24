import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseConfigurationComponent } from './instructor-course-configuration.component';

describe('InstructorCourseConfigurationComponent', () => {
  let component: InstructorCourseConfigurationComponent;
  let fixture: ComponentFixture<InstructorCourseConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorCourseConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorCourseConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
