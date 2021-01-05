import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTopicByCategoryComponent } from './list-topic-by-category.component';

describe('ListTopicByCategoryComponent', () => {
  let component: ListTopicByCategoryComponent;
  let fixture: ComponentFixture<ListTopicByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTopicByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTopicByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
