import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarAdministracionComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarAdministracionComponent;
  let fixture: ComponentFixture<NavBarAdministracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarAdministracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
