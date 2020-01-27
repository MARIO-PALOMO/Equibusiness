import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZCotizacionReporteEmailClienteComponent } from './z-cotizacion-reporte-email-cliente.component';

describe('ZCotizacionReporteEmailClienteComponent', () => {
  let component: ZCotizacionReporteEmailClienteComponent;
  let fixture: ComponentFixture<ZCotizacionReporteEmailClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZCotizacionReporteEmailClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZCotizacionReporteEmailClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
