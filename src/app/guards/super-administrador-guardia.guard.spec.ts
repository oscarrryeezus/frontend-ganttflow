import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { superAdministradorGuardiaGuard } from './super-administrador-guardia.guard';

describe('superAdministradorGuardiaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => superAdministradorGuardiaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
