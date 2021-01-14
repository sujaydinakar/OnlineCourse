import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCourseLevelComponent } from './admin-add-course-level.component';

describe('AdminAddCourseLevelComponent', () => {
  let component: AdminAddCourseLevelComponent;
  let fixture: ComponentFixture<AdminAddCourseLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddCourseLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCourseLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
