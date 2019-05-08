import { TestBed } from '@angular/core/testing';

import { PersonaladgService } from './personaladg.service';

describe('PersonaladgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonaladgService = TestBed.get(PersonaladgService);
    expect(service).toBeTruthy();
  });
});
