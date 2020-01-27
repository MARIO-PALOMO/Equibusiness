import { TestBed, inject } from '@angular/core/testing';

import { GeneradorVehiculosService } from './generador-vehiculos.service';

describe('GeneradorVehiculosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneradorVehiculosService]
    });
  });

  it('should be created', inject([GeneradorVehiculosService], (service: GeneradorVehiculosService) => {
    expect(service).toBeTruthy();
  }));
});
