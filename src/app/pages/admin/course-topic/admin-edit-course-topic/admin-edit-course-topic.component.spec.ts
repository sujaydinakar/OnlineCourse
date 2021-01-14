import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditCourseTopicComponent } from './admin-edit-course-topic.component';

describe('AdminEditCourseTopicComponent', () => {
  let component: AdminEditCourseTopicComponent;
  let fixture: ComponentFixture<AdminEditCourseTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditCourseTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditCourseTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
