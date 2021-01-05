import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBlahCoursesComponent } from './all-blah-courses.component';

describe('AllBlahCoursesComponent', () => {
  let component: AllBlahCoursesComponent;
  let fixture: ComponentFixture<AllBlahCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBlahCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBlahCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
