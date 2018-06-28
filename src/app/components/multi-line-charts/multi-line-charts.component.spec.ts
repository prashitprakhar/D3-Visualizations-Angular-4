import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLineChartsComponent } from './multi-line-charts.component';

describe('MultiLineChartsComponent', () => {
  let component: MultiLineChartsComponent;
  let fixture: ComponentFixture<MultiLineChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiLineChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLineChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
