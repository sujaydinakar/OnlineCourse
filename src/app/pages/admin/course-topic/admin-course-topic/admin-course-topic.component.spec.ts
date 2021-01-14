import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseTopicComponent } from './admin-course-topic.component';

describe('AdminCourseTopicComponent', () => {
  let component: AdminCourseTopicComponent;
  let fixture: ComponentFixture<AdminCourseTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCourseTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
