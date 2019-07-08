import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

/**
 * Componente que muestra el footer ( se debería mover a un componente llamado footer)
 * Es el componente principal del proyecto, es el que llama a los router outlet 
 * (los componentes hijos)
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

       constructor (private authService: AuthService) {}
        
       ngOnInit(){
           if (this.authService.isLoggedIn) {
               let profile = this.authService.usserLogged.perfil;
               console.log('USER PERFIL LLEGA? : ' + profile + '|');
               this.authService.redByUrlPerfiles(profile);
           }
       }
  
}