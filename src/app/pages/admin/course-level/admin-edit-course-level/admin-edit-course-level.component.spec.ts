import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditCourseLevelComponent } from './admin-edit-course-level.component';

describe('AdminEditCourseLevelComponent', () => {
  let component: AdminEditCourseLevelComponent;
  let fixture: ComponentFixture<AdminEditCourseLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditCourseLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditCourseLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
