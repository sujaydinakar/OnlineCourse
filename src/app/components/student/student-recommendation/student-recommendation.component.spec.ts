import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRecommendationComponent } from './student-recommendation.component';

describe('StudentRecommendationComponent', () => {
  let component: StudentRecommendationComponent;
  let fixture: ComponentFixture<StudentRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRecommendationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
