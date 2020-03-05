import { TestBed } from '@angular/core/testing';

import { SideService } from './side.service';

describe('SideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SideService = TestBed.get(SideService);
    expect(service).toBeTruthy();
  });
});
