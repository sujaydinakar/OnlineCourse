import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditCourseLanguageComponent } from './admin-edit-course-language.component';

describe('AdminEditCourseLanguageComponent', () => {
  let component: AdminEditCourseLanguageComponent;
  let fixture: ComponentFixture<AdminEditCourseLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditCourseLanguageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditCourseLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
