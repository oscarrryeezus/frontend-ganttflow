import {Vacacioneservice } from './vacaciones.service';
import { TestBed } from '@angular/core/testing';


describe('Vacacioneservice', () => {
  let service: Vacacioneservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Vacacioneservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
