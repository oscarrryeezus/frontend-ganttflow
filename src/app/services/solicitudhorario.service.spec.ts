import { TestBed } from '@angular/core/testing';

import { SolicitudhorarioService } from './solicitudhorario.service';

describe('SolicitudhorarioService', () => {
  let service: SolicitudhorarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudhorarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
