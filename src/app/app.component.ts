import { Component } from '@angular/core';
import { Router } from '@angular/router';


/**
 * Componente que muestra el footer ( se debería mover a un componente llamado footer)
 * Es el componente principal del proyecto, es el que llama a los router outlet 
 * (los componentes hijos)
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ATT';

    /*variable login*/
    public islogin=false;
    /*variables de login*/
    public correo;
    public password;

    constructor (public router: Router) {
    
      }
    /*metodo login*/  
    public login () {
        console.log(this.correo, this.password);
        //si retorna true, pasa a project
        if (this.correo==="a@a") {
            this.islogin=true;
        }
        //si retorna false, se mantiene en el login
        else {
            this.islogin=false;

        loginAuth () {
            return this.authService.setUser(data.user)
            
        }
        }     
    }
}


        //llamar a project.ts con un parametro extra (localhost/projects)
   
        // si retorna false permanecer en login mostrar popup con la accionerronea
    
    
 

