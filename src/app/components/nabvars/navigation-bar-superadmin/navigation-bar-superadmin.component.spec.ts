import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarSuperadminComponent } from './navigation-bar-superadmin.component';

describe('NavigationBarSuperadminComponent', () => {
  let component: NavigationBarSuperadminComponent;
  let fixture: ComponentFixture<NavigationBarSuperadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBarSuperadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationBarSuperadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
