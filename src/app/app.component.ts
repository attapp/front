import { Component } from '@angular/core';
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

    /*const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        })
      };
     

    /*variable login*/
    public islogin=false;
    public correo;
    public password;

    constructor (public router: Router, private http: HttpClient, /*private headers :HttpHeaders */) {
    
      }
    /*metodo login*/  
    public login () {
        this.http.post('http://localhost:3000/login',{user: this.correo, password: this.password}/*, this.*/)
        .subscribe(
            data => { 
                console.log(data);
            },
            error => console.log(error))
          }
         }

        /*.toPromise().then((resp) => {
            console.log(resp)
        });
        console.log(this.correo, this.password);
        //si retorna true, pasa a project
        if (this.correo==="a@a") {
            this.islogin=true;
        }
        //si retorna false, se mantiene en el login
        else {
            
            this.islogin=false;

        }
/* metodo login
 authLogin () {
   return this.nombredelservicio.//no se que ingresa aqui (this.user.email, this.user.pass)
   .subscribe(
     data => {
        console.log(data); //se alamcena en la consola
   },
   error => console.log(error))
 }
}

*/

    



        //llamar a project.ts con un parametro extra (localhost/projects)
   
        // si retorna false permanecer en login mostrar popup con la accionerronea
    
    
