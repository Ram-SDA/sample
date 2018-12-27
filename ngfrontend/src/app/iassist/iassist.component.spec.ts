import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IassistComponent } from './iassist.component';

describe('IassistComponent', () => {
  let component: IassistComponent;
  let fixture: ComponentFixture<IassistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IassistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IassistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
