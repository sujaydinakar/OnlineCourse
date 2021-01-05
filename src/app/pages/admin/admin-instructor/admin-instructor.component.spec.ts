import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInstructorComponent } from './admin-instructor.component';

describe('AdminInstructorComponent', () => {
  let component: AdminInstructorComponent;
  let fixture: ComponentFixture<AdminInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
