import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealfakeComponent } from './realfake.component';

describe('RealfakeComponent', () => {
  let component: RealfakeComponent;
  let fixture: ComponentFixture<RealfakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealfakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealfakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
