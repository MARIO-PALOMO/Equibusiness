import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionGarantiasComponent } from './cotizacion-garantias.component';

describe('CotizacionGarantiasComponent', () => {
  let component: CotizacionGarantiasComponent;
  let fixture: ComponentFixture<CotizacionGarantiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizacionGarantiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionGarantiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
