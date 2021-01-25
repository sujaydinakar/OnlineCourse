import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSectionBlockComponent } from './course-section-block.component';

describe('CourseSectionBlockComponent', () => {
  let component: CourseSectionBlockComponent;
  let fixture: ComponentFixture<CourseSectionBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseSectionBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSectionBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
