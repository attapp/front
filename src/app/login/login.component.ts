import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { User } from '../interfaces/User';
import { environment } from 'src/environments/environment';
import { asTextData } from '@angular/core/src/view';

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
      
      this.http.post<any>(environment.API_ENDPOINT + '/login', {user: this.user, password: this.password})
        .subscribe
        ((data) => {
            const id = data['idUser'];
            const perfil = data['idPerfil'];
            const u: User = {id: id, username: this.user, perfil: perfil};        
            this.authService.setUserLoggedIn(u);
            this.authService.redByUrlPerfiles(perfil);
        }
        , (err) => {
            console.log("ERROR: " + err);
            this.error = true;
        }, 
        
        )
      }
  ngOnInit() {  
    if (this.authService.getUserLoggedInLocal) {
      this.authService.setUserLoggedOut();
    }

  }

}
