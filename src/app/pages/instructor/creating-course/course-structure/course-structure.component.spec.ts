import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStructureComponent } from './course-structure.component';

describe('CourseStructureComponent', () => {
  let component: CourseStructureComponent;
  let fixture: ComponentFixture<CourseStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
