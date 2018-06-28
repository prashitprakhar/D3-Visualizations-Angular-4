import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleYComponent } from './circle-y.component';

describe('CircleYComponent', () => {
  let component: CircleYComponent;
  let fixture: ComponentFixture<CircleYComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleYComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
