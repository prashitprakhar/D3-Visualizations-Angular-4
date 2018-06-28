import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleXComponent } from './circle-x.component';

describe('CircleXComponent', () => {
  let component: CircleXComponent;
  let fixture: ComponentFixture<CircleXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
