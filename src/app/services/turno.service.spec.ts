import {TurnoService } from './turno.service';
import { TestBed } from '@angular/core/testing';


describe('TurnoService', () => {
  let service: TurnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
