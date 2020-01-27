import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionInicioComponent } from './cotizacion-inicio.component';

describe('CotizacionInicioComponent', () => {
  let component: CotizacionInicioComponent;
  let fixture: ComponentFixture<CotizacionInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizacionInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
