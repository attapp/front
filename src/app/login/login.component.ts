import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { User } from '../interfaces/User';

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
      
      this.http.post<any>('http://localhost:3000/login', {user: this.user, password: this.password})
        .subscribe
        ((data) => {
            let id = data['idUser'];
            let perfil = data['perfil'];
            let u: User = {id: id, username: this.user, perfil: perfil};        
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

