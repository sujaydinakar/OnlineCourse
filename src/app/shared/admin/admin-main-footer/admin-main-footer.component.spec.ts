import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMainFooterComponent } from './admin-main-footer.component';

describe('AdminMainFooterComponent', () => {
  let component: AdminMainFooterComponent;
  let fixture: ComponentFixture<AdminMainFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMainFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMainFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
