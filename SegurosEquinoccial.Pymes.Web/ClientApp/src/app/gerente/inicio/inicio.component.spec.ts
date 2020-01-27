import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioGerenciaComponent } from './inicio.component';

describe('InicioComponent', () => {
  let component: InicioGerenciaComponent;
  let fixture: ComponentFixture<InicioGerenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioGerenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioGerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
