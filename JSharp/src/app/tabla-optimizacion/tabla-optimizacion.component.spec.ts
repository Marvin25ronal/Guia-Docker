import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOptimizacionComponent } from './tabla-optimizacion.component';

describe('TablaOptimizacionComponent', () => {
  let component: TablaOptimizacionComponent;
  let fixture: ComponentFixture<TablaOptimizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaOptimizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaOptimizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
