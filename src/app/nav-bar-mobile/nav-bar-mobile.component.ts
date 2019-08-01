import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-mobile',
  templateUrl: './nav-bar-mobile.component.html',
  styleUrls: ['./nav-bar-mobile.component.scss']
})
export class NavBarMobileComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

    /**
    * Cierra sesión redirigiendo a Log IN
    */
   logout() { 
    this.authService.setUserLoggedOut();
    this.router.navigateByUrl('/login');
} 
/**
 * volver a vista Projectos
 */
volver() {
    this.router.navigate(['dashboards']);
}   
  ngOnInit() {
  }

}
