import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmAndEditComponent } from './film-and-edit.component';

describe('FilmAndEditComponent', () => {
  let component: FilmAndEditComponent;
  let fixture: ComponentFixture<FilmAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmAndEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
