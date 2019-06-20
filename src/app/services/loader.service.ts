import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../interfaces/LoaderState';

/**
 * Servicio que muestra el loader de la aplicación
 * se lo agrega a cualquier peticion Http mediante el interceptor
 */
@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private loaderSubject = new Subject<LoaderState>();
    loaderState = this.loaderSubject.asObservable();
    constructor() { }
    show() {
        this.loaderSubject.next({ show: true } as LoaderState);
    }
    hide() {
        this.loaderSubject.next({ show: false } as LoaderState);
    }
}
