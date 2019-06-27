import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

/*import { HttpHeaders } from '@angular/common/http';
import { httpOptions } from '';





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
export class AppComponent {
    title = 'ATT';

    /*variables login*/
    public islogin=false;
    public correo;
    public password;
   

    constructor (public router: Router, private http: HttpClient) {}

    /*metodo login*/  
    public login() {
      this.http.post('http://localhost:3000/login',{user: this.correo, password: this.password})
    .subscribe
    (data => { console.log(data);
    }, 
    error => console.log(error))
    }

    if (this.data.validacion) {
    this.islogin=true;
}
else {
    this.islogin=false;
}
  
  }

  
  


    /**
     * metodo redireccionar
     * redirecciona a los usuarios a sus respectivas paginas  
     * 
     * public redireccionar() {user: this.correo;
      pasword: this.password;
      
      if (this.correo===true) {
            this.islogin=true;
        }
      else {
            this.islogin=false;
        }
      } 
  }
     */
  

  
        
    

    



        //llamar a project.ts con un parametro extra (localhost/projects)
   
        // si retorna false permanecer en login mostrar popup con la accionerronea
    

