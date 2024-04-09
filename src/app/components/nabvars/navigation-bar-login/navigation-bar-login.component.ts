import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navigation-bar-login',
  templateUrl: './navigation-bar-login.component.html',
  styleUrl: './navigation-bar-login.component.css'
})
export class NavigationBarLoginComponent {
  scrolled: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Verificar si se ha hecho scroll
    if (window.pageYOffset > 0) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }
}
