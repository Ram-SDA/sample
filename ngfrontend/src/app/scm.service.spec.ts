import { TestBed, inject } from '@angular/core/testing';

import { ScmService } from './scm.service';

describe('ScmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScmService]
    });
  });

  it('should be created', inject([ScmService], (service: ScmService) => {
    expect(service).toBeTruthy();
  }));
});
