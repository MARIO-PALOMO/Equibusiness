import { TestBed, inject } from '@angular/core/testing';

import { GeneradorService } from './generador.service';

describe('GeneradorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneradorService]
    });
  });

  it('should be created', inject([GeneradorService], (service: GeneradorService) => {
    expect(service).toBeTruthy();
  }));
});
