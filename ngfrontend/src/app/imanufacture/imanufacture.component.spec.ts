import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImanufactureComponent } from './imanufacture.component';

describe('ImanufactureComponent', () => {
  let component: ImanufactureComponent;
  let fixture: ComponentFixture<ImanufactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImanufactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImanufactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
