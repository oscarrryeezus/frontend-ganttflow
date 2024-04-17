import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudCambioHorarioComponent } from './solicitud-cambio-horario.component';

describe('SolicitudCambioHorarioComponent', () => {
  let component: SolicitudCambioHorarioComponent;
  let fixture: ComponentFixture<SolicitudCambioHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudCambioHorarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudCambioHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
