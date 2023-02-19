import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MViewOnlyComponent } from './m-view-only.component';

describe('MViewOnlyComponent', () => {
  let component: MViewOnlyComponent;
  let fixture: ComponentFixture<MViewOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MViewOnlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MViewOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
