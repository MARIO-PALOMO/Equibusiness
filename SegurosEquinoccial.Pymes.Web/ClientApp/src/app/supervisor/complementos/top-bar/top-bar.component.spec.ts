import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarSupervisionComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarSupervisionComponent;
  let fixture: ComponentFixture<TopBarSupervisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarSupervisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
