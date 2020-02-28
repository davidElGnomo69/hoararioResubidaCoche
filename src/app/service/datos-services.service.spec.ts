import { TestBed } from '@angular/core/testing';

import { DatosServicesService } from './datos-services.service';

describe('DatosServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatosServicesService = TestBed.get(DatosServicesService);
    expect(service).toBeTruthy();
  });
});
