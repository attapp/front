import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  title = 'ATT';

    // variables login
    public error = false; 
    private user;
    private password;

    constructor (private authService: AuthService, private http: HttpClient, private router: Router) {}

    // metodo login

    login() {  
      //event.preventDefault(); 
      
      this.http.post<any>('http://localhost:3000/login', {user: this.user, pass: this.password})
        .subscribe
        ((data) => {
            let perfil = data['perfil'];
            let u: User = {username: this.user, perfil: perfil};        
            this.authService.setUserLoggedIn(u);
          switch (perfil) {
            case 4: 
              // Redirigir vista LIDER
              // DASHBOARD

            case 3:  
              // Vista Orquestador (ADM)
              this.router.navigateByUrl('/project');

            case 2:
              // Redirigir vista RESPONSABLE
          }
           
        }
        , (err) => {
            console.log("ERROR: " + err);
            this.error = true;
        }, 
        
        )
    }

  ngOnInit() {   
  }
}

