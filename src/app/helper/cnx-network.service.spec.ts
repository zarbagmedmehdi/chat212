import { TestBed } from '@angular/core/testing';

import { CnxNetworkService } from './cnx-network.service';

describe('CnxNetworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CnxNetworkService = TestBed.get(CnxNetworkService);
    expect(service).toBeTruthy();
  });
});
