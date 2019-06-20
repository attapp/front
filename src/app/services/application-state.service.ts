import { Injectable } from '@angular/core';

/**
 * Servicio que verifica el tamaaño de pantalla,
 * si este es mayor que 768 muestra la version desktop,
 * en caso contrario muestra la version mobile
 */

@Injectable({
    providedIn: 'root'
})
export class ApplicationStateService {

    private isMobileResolution: boolean;

    constructor() {
        if (window.innerWidth < 768) {
            this.isMobileResolution = true;
        } else {
            this.isMobileResolution = false;
        }
    }

    public getIsMobileResolution(): boolean {
        return this.isMobileResolution;
    }
}