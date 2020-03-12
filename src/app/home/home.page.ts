import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}
  // Funcion para navegar al login
  goToLogin() {
    // Navegando al login
    this.router.navigate(['/login']);
    // Navegando al login
  }
  // Funcion para navegar al login
  // Funcion para navegar al registro
  goToRegister() {
    // Navegando al registro
    this.router.navigate(['/register']);
    // Navegando al registro
  }
  // Funcion para navegar al registro

}
