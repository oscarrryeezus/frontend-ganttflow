import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar-superadmin',
  templateUrl: './navigation-bar-superadmin.component.html',
  styleUrl: './navigation-bar-superadmin.component.css'
})
export class NavigationBarSuperadminComponent {
  constructor(
    private authServicio: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private elementRef: ElementRef 
  ){}
  
  token: string = this.cookieService.get('token');
  cookie = this.cookieService.check('token');

  scrolled: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Verificar si se ha hecho scroll
    this.scrolled = window.pageYOffset > 0;
  }

  dropdownVisible: boolean = false;
  dropdownVisiblea: boolean = false;
  dropdownVisibles: boolean = false;
  dropdownVisibless: boolean = false;
  dropdownVisibleaa: boolean = false;

  @ViewChild('dropdownMenu') dropdownMenu: ElementRef | undefined;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  toggleDropdowna() {
    this.dropdownVisiblea = !this.dropdownVisiblea;
    this.dropdownVisibles = false;
  }

  toggleDropdowns() {
    this.dropdownVisibles = !this.dropdownVisibles;
    this.dropdownVisiblea = false;
  }

  toggleDropdownss() {
    this.dropdownVisibless = !this.dropdownVisibless;
    this.dropdownVisibleaa = false;
  }

  toggleDropdownaa() {
    this.dropdownVisibleaa = !this.dropdownVisibleaa;
    this.dropdownVisibless = false;
  }

  toggleDropdownns(menu: string) {
    // Cerrar los otros menús si están abiertos
    if (menu !== 'a') {
      this.dropdownVisiblea = false;
    }
    if (menu !== 's') {
      this.dropdownVisibles = false;
    }
    if (menu !== 'ss') {
      this.dropdownVisibless = false;
    }

    // Abrir o cerrar el menú deseado
    switch(menu) {
      case 'a':
        this.dropdownVisiblea = !this.dropdownVisiblea;
        break;
      case 's':
        this.dropdownVisibles = !this.dropdownVisibles;
        break;
      case 'ss':
        this.dropdownVisibless = !this.dropdownVisibless;
        break;
      default:
        this.dropdownVisible = !this.dropdownVisible;
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Verificar si el clic se hizo fuera de la barra de navegación
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // Cerrar todos los menús si están abiertos
      this.dropdownVisible = false;
      this.dropdownVisiblea = false;
      this.dropdownVisibles = false;
      this.dropdownVisibless = false;
    }
  }

  salir(){
    this.authServicio.logOut(this.token).subscribe(
      (response) => { 
        this.cookieService.set('', response.token);
        console.log(response);
        this.router.navigate(['login']);
      },
      (error) => {
        // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }
}
