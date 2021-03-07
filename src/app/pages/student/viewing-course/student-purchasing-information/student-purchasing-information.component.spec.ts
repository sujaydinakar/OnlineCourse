import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPurchasingInformationComponent } from './student-purchasing-information.component';

describe('StudentPurchasingInformationComponent', () => {
  let component: StudentPurchasingInformationComponent;
  let fixture: ComponentFixture<StudentPurchasingInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentPurchasingInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPurchasingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
