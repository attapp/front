import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class GuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        if (!this.authService.getUserLoggedIn()) {
            console.log('No estás logueado');
            this.router.navigate(['/login']);
            return false;
        } 
        return true;
    }
    CanActivateChild() {
        // If the user is not logged in we'll send them back to the home page
        if (!this.authService.getUserLoggedIn()) {
            console.log('No estás logueado');
            this.router.navigate(['/login']);
            return false;
        } 
        return true;
    }
}

