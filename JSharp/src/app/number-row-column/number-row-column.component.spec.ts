import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberRowColumnComponent } from './number-row-column.component';

describe('NumberRowColumnComponent', () => {
  let component: NumberRowColumnComponent;
  let fixture: ComponentFixture<NumberRowColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberRowColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberRowColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
