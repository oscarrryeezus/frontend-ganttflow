import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarLoginComponent } from './navigation-bar-login.component';

describe('NavigationBarLoginComponent', () => {
  let component: NavigationBarLoginComponent;
  let fixture: ComponentFixture<NavigationBarLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBarLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationBarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
