import {EmpleadoService } from './empleado.service';
import { TestBed } from '@angular/core/testing';


describe('EmpleadoService', () => {
  let service: EmpleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
