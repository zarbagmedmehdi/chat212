import { TestBed } from '@angular/core/testing';

import { LogSignService } from './logSign.service';

describe('ConnexionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogSignService = TestBed.get(LogSignService);
    expect(service).toBeTruthy();
  });
});
