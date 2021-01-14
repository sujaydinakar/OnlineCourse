import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditSubcategoryComponent } from './admin-edit-subcategory.component';

describe('AdminEditSubcategoryComponent', () => {
  let component: AdminEditSubcategoryComponent;
  let fixture: ComponentFixture<AdminEditSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditSubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
