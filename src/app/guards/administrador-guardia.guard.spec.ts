import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { administradorGuardiaGuard } from './administrador-guardia.guard';

describe('administradorGuardiaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => administradorGuardiaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
