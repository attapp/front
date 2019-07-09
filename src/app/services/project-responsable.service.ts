import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * servicio que interactua con el back para crear y obtener proyectos
 */
@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpClient) { }

    private getProjectsUrl = environment.API_ENDPOINT + `/projects/resp`;

    getProjects() {
        // now returns an Observable of Projects
        return this.http.get(this.getProjectsUrl);
    }
}
