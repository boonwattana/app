import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MTimeComponent } from './m-time.component';

describe('MTimeComponent', () => {
  let component: MTimeComponent;
  let fixture: ComponentFixture<MTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
