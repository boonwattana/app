import { ComponentFixture, TestBed } from '@angular/core/testing';

import { T01Component } from './t01.component';

describe('T01Component', () => {
  let component: T01Component;
  let fixture: ComponentFixture<T01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ T01Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(T01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
