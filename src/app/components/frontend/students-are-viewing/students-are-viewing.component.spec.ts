import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsAreViewingComponent } from './students-are-viewing.component';

describe('StudentsAreViewingComponent', () => {
  let component: StudentsAreViewingComponent;
  let fixture: ComponentFixture<StudentsAreViewingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsAreViewingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsAreViewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
