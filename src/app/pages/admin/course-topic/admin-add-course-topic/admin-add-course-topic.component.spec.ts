import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCourseTopicComponent } from './admin-add-course-topic.component';

describe('AdminAddCourseTopicComponent', () => {
  let component: AdminAddCourseTopicComponent;
  let fixture: ComponentFixture<AdminAddCourseTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddCourseTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCourseTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
