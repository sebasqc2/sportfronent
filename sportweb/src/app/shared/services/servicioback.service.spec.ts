import { TestBed } from '@angular/core/testing';

import { ServiciobackService } from './servicioback.service';

describe('ServiciobackService', () => {
  let service: ServiciobackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciobackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
