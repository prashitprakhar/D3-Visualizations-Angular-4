import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclePointLineComponent } from './circle-point-line.component';

describe('CirclePointLineComponent', () => {
  let component: CirclePointLineComponent;
  let fixture: ComponentFixture<CirclePointLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirclePointLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclePointLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
