import { TestBed } from '@angular/core/testing';

import { PulicacionService } from './pulicacion.service';

describe('PulicacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PulicacionService = TestBed.get(PulicacionService);
    expect(service).toBeTruthy();
  });
});
