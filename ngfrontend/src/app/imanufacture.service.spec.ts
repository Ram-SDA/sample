import { TestBed, inject } from '@angular/core/testing';

import { ImanufactureService } from './imanufacture.service';

describe('ImanufactureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImanufactureService]
    });
  });

  it('should be created', inject([ImanufactureService], (service: ImanufactureService) => {
    expect(service).toBeTruthy();
  }));
});
