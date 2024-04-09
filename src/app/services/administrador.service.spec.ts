import {AdministradorService } from './administrador.service';
import { TestBed } from '@angular/core/testing';


describe('AdministradorService', () => {
  let service: AdministradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
