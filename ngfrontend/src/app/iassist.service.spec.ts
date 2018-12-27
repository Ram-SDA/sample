import { TestBed, inject } from '@angular/core/testing';

import { IassistService } from './iassist.service';

describe('IassistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IassistService]
    });
  });

  it('should be created', inject([IassistService], (service: IassistService) => {
    expect(service).toBeTruthy();
  }));
});
