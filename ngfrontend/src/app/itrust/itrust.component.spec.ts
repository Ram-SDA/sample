import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItrustComponent } from './itrust.component';

describe('ItrustComponent', () => {
  let component: ItrustComponent;
  let fixture: ComponentFixture<ItrustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItrustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItrustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
