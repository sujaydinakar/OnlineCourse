import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseLevelComponent } from './admin-course-level.component';

describe('AdminCourseLevelComponent', () => {
  let component: AdminCourseLevelComponent;
  let fixture: ComponentFixture<AdminCourseLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCourseLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
