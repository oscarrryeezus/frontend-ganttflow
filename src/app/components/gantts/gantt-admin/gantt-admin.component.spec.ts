import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttAdminComponent } from './gantt-admin.component';

describe('GanttAdminComponent', () => {
  let component: GanttAdminComponent;
  let fixture: ComponentFixture<GanttAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanttAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GanttAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
