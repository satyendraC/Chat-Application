import { TestBed } from '@angular/core/testing';

import { CommonModulesService } from './common-modules.service';

describe('CommonModulesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonModulesService = TestBed.get(CommonModulesService);
    expect(service).toBeTruthy();
  });
});
