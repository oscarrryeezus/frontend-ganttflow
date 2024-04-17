import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudContratoComponent } from './crud-contrato.component';

describe('CrudContratoComponent', () => {
  let component: CrudContratoComponent;
  let fixture: ComponentFixture<CrudContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudContratoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
