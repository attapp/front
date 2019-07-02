import { Injectable } from '@angular/core';
import { User } from "../login/user.model";



@Injectable()
export class AuthService {

  public isLoggedIn: boolean;
  public usserLogged: User;

  constructor() { 
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
}
