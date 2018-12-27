import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdressComponent } from './idress.component';

describe('IdressComponent', () => {
  let component: IdressComponent;
  let fixture: ComponentFixture<IdressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
