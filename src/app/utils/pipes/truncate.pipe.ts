import { Pipe, PipeTransform } from '@angular/core';

/**
 * Este pipe obtiene el valor de un string y lo corta dejando puntos supensivos cuando alcanza un tamaño dado
 * ej hola si se realiza el truncate de 2 caracteres quedaría ho...
 */
@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    /**
     * Función que retorna el texto cortado, agregando puntos suspensivos cuando supera el límite
     * @param value string que se cortará
     * @param args puede obtener dos argumentos, uno es el tamaño de caracteres
     *  y el otro opcional es el texto que se colocará luego de cortar el texto
     */
    transform(value: string, args: string[]): string {
        const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
        const trail = args.length > 1 ? args[1] : '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}
