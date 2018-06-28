import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilineScatterplotComponent } from './multiline-scatterplot.component';

describe('MultilineScatterplotComponent', () => {
  let component: MultilineScatterplotComponent;
  let fixture: ComponentFixture<MultilineScatterplotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultilineScatterplotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultilineScatterplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
