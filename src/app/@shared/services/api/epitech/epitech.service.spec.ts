import { TestBed } from '@angular/core/testing';

import { EpitechService } from './epitech.service';

describe('EpitechService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EpitechService = TestBed.get(EpitechService);
    expect(service).toBeTruthy();
  });
});
