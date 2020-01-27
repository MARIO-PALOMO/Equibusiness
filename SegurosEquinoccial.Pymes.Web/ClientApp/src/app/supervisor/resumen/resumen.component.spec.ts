import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenSupervisionComponent } from './resumen.component';

describe('ResumenComponent', () => {
  let component: ResumenSupervisionComponent;
  let fixture: ComponentFixture<ResumenSupervisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenSupervisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
