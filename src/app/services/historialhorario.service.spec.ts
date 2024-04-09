import {HistorialHorarioService } from './historialhorario.service';
import { TestBed } from '@angular/core/testing';


describe('HistorialHorarioService', () => {
  let service: HistorialHorarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialHorarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
