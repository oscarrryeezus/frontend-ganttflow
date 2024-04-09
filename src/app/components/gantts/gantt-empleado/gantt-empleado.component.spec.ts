import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttEmpleadoComponent } from './gantt-empleado.component';

describe('GanttEmpleadoComponent', () => {
  let component: GanttEmpleadoComponent;
  let fixture: ComponentFixture<GanttEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanttEmpleadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GanttEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
