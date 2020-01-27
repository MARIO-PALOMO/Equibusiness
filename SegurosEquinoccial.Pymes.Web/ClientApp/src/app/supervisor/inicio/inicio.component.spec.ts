import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSupervisionComponent } from './inicio.component';

describe('InicioComponent', () => {
  let component: InicioSupervisionComponent;
  let fixture: ComponentFixture<InicioSupervisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioSupervisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
