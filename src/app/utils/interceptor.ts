import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoaderService } from '../services/loader.service';
/**
 * Este interceptor intercepta las peticiones http, cada vez que se realice una petición aparecerá el loading
 * cuando termine la petición desaparecerá
 * En este interceptor también se pueden agregar peticiones en el header
 */
@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.showLoader();
        request = request.clone({
            setHeaders: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.onEnd();
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log('error--->>>', error.message);
                this.onEnd();
                return throwError(error);
            }));
    }
    private onEnd(): void {
        this.hideLoader();
    }
    private showLoader(): void {
        this.loaderService.show();
    }
    private hideLoader(): void {
        this.loaderService.hide();
    }

}
