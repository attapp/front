import { Injectable } from '@angular/core';
import { User } from "../interfaces/User";
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

  public isLoggedIn: boolean;
  public usserLogged: User;

  constructor(private router: Router, ) { 
  	this.isLoggedIn = false;
  }

  setUserLoggedIn(user: User) {
    this.isLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('currentId', JSON.stringify(this.usserLogged.id));
    localStorage.setItem('currentProfile', JSON.stringify(this.usserLogged.perfil));
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  setProjectUser(projectId: string) {
    localStorage.setItem('currentProyect', projectId);
  }

  getUserLoggedInLocal() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  setUserLoggedOut() {
    this.isLoggedIn = false;
    this.usserLogged = undefined;  
  	return localStorage.removeItem('currentUser');
  }

  redByUrlPerfiles(perfil: any) {
    switch (perfil) {
      case 4: 
        // Redirigir vista LIDER
        this.router.navigate(['/dashboard']);
        break;
      case 3:  
        // Vista Orquestador (ADM)
        this.router.navigate(['/project']);
        break;
      case 2:
        // Redirigir vista RESPONSABLE
        this.router.navigate(['/projectresp']);
        break;
    }
  }
}
