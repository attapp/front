import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../interfaces/Project';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Componente que muestra el combobox con los distintos proyectos
 * es el componente padre de los tabs 
 */

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {    
    /**
     * 
     * @param projectService servicio que sirve para interactuar con los proyectos en el back
     * @param router genera la ruta para modificar las pantallas
     */
    constructor(private projectService: ProjectService, 
                private router: Router, 
                public activatedRoute: ActivatedRoute) {
    }

    private projects: Project[];
    public projectId = '';


    /**
     * al iniciar llama a showproject para mostrar los proyectos
     */
    ngOnInit() {
            this.showProjects();
    }

    /**
     * muestra los proyectos
     */
    showProjects() {
        this.projectService.getProjects()
            // resp is of type
            .subscribe((resp: Project[]) => {
                this.projects = resp;
            });
    }  

    /**
     * 
     * @param id muestra los cambios en el proyecto
     */
    change(id: number) {
        console.log("projectID change", this.projectId);

    }


}
