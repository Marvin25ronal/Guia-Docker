import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PestaniaComponent } from './pestania.component';

describe('PestaniaComponent', () => {
  let component: PestaniaComponent;
  let fixture: ComponentFixture<PestaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PestaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PestaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
