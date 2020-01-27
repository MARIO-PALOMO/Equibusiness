import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenGerenteComponent } from './resumen.component';

describe('ResumenGerenteComponent', () => {
  let component: ResumenGerenteComponent;
  let fixture: ComponentFixture<ResumenGerenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenGerenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
