import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudVacacionComponent } from './solicitud-vacacion.component';

describe('SolicitudVacacionComponent', () => {
  let component: SolicitudVacacionComponent;
  let fixture: ComponentFixture<SolicitudVacacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudVacacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudVacacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
