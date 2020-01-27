import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioClienteComponent } from './inicio.component';

describe('InicioComponent', () => {
  let component: InicioClienteComponent;
  let fixture: ComponentFixture<InicioClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InicioClienteComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
