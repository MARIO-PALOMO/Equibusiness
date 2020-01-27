import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionGirosComponent } from './cotizacion-giros.component';

describe('CotizacionGirosComponent', () => {
  let component: CotizacionGirosComponent;
  let fixture: ComponentFixture<CotizacionGirosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizacionGirosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionGirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
