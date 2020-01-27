import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZCotizacionReporteEmailUsuarioComponent } from './z-cotizacion-reporte-email-usuario.component';

describe('ZCotizacionReporteEmailUsuarioComponent', () => {
  let component: ZCotizacionReporteEmailUsuarioComponent;
  let fixture: ComponentFixture<ZCotizacionReporteEmailUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZCotizacionReporteEmailUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZCotizacionReporteEmailUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
