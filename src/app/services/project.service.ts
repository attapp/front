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

    private getProjectsUrl = environment.API_ENDPOINT + `/projects`;
    private createProjectsUrl = environment.API_ENDPOINT + `/projects/new`;

    getProjects(idUser?: number) {
        // now returns an Observable of Projects        
        if(idUser) {
        return this.http.get(this.getProjectsUrl + `/${idUser}`);
        } else     
        return this.http.get(this.getProjectsUrl);
    }


    createProject(data: FormData) {

        return this.http.post(this.createProjectsUrl, data, {
            //reportProgress: true,
            //observe: 'events'
        });

    }
}
