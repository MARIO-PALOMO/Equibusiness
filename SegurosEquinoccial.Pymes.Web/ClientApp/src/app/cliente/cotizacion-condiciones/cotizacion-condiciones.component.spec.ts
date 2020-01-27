import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionCondicionesComponent } from './cotizacion-condiciones.component';

describe('CotizacionCondicionesComponent', () => {
  let component: CotizacionCondicionesComponent;
  let fixture: ComponentFixture<CotizacionCondicionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizacionCondicionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionCondicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
