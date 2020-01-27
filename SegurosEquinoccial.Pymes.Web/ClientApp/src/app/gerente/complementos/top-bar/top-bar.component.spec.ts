import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarGerenteComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarGerenteComponent;
  let fixture: ComponentFixture<TopBarGerenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarGerenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
