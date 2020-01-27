import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionReporteComponent } from './cotizacion-reporte.component';

describe('CotizacionReporteComponent', () => {
  let component: CotizacionReporteComponent;
  let fixture: ComponentFixture<CotizacionReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizacionReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
