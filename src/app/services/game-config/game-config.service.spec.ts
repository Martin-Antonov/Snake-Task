import { TestBed } from '@angular/core/testing';

import { GameConfigService } from './game-config.service';

describe('GameConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameConfigService = TestBed.get(GameConfigService);
    expect(service).toBeTruthy();
  });
});
