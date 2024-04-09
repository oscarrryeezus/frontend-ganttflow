import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacacionesComponent } from './vacaciones.component';

describe('VacacionesComponent', () => {
  let component: VacacionesComponent;
  let fixture: ComponentFixture<VacacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VacacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
