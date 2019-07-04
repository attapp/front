import { Injectable } from '@angular/core';
import { User } from "../login/user.model";
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';




@Injectable()
export class AuthService implements CanActivate{

  public isLoggedIn: boolean;
  public usserLogged: User;

  constructor(private router: Router, ) { 
  	this.isLoggedIn = false;
  }

  setUserLoggedIn(user: User) {
    this.isLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  
  }

  getUserLoggedIn() {
  	return JSON.parse(localStorage.getItem('currentUser'));
  }

  setUserLoggedOut() {
    this.isLoggedIn = false;
    this.usserLogged = undefined;  
  	return localStorage.removeItem('currentUser');
  }

  canActivate() {
    // Si el usuario está logeado redirecciono a la pág inicio
    if (this.getUserLoggedIn()) {
        this.router.navigateByUrl('/');
        return false;
    } 
    return true;
}
}
