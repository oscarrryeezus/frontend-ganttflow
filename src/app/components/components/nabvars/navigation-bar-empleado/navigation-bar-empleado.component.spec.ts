import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarEmpleadoComponent } from './navigation-bar-empleado.component';

describe('NavigationBarEmpleadoComponent', () => {
  let component: NavigationBarEmpleadoComponent;
  let fixture: ComponentFixture<NavigationBarEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBarEmpleadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationBarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
