import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudSupAdminComponent } from './solicitud-sup-admin.component';

describe('SolicitudSupAdminComponent', () => {
  let component: SolicitudSupAdminComponent;
  let fixture: ComponentFixture<SolicitudSupAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudSupAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudSupAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
