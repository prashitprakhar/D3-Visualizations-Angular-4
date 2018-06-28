import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3LineGraphComponent } from './d3-line-graph.component';

describe('D3LineGraphComponent', () => {
  let component: D3LineGraphComponent;
  let fixture: ComponentFixture<D3LineGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3LineGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3LineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
