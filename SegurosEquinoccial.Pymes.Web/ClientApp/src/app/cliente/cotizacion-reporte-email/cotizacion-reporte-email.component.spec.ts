import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionReporteEmailComponent } from './cotizacion-reporte-email.component';

describe('CotizacionReporteEmailComponent', () => {
  let component: CotizacionReporteEmailComponent;
  let fixture: ComponentFixture<CotizacionReporteEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizacionReporteEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionReporteEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
