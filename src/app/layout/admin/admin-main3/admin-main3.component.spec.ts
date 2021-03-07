import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMain3Component } from './admin-main3.component';

describe('AdminMain3Component', () => {
  let component: AdminMain3Component;
  let fixture: ComponentFixture<AdminMain3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMain3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMain3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
