import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';
import { Project } from '../interfaces/Project';
import { Router} from '@angular/router';

/**
 * Componente que muestra el combobox con los distintos proyectos 
 */
@Component({
  selector: 'app-project-dash',
  templateUrl: './project-dash.component.html',
  styleUrls: ['./project-dash.component.scss']
})
export class ProjectDashComponent implements OnInit {

  constructor(private projectService: ProjectService,
              private authService: AuthService,
              private router: Router) { }

  private projects: Project[];
  public projectId = '';
  private idUser;


  /**
   * al iniciar llama a showprojectbyuser para mostrar los proyectos según usuario
   */
  ngOnInit() {
    this.idUser = localStorage.getItem('currentId');
    this.showProjectsByUser();
  }

  /**
     * muestra los proyectos según id de Usuario
    */
  showProjectsByUser() {
    this.projectService.getProjectsByUser(this.idUser)
        // resp is of type
        .subscribe((resp: Project[]) => {
            this.projects = resp;
            console.log(this.projects);

        });
        
      } 
  /**
     * 
     * @param id muestra los cambios en el proyecto
     */
    change(id: number) {
      console.log("projectID change", this.projectId);
      this.authService.setProjectUser(this.projectId);
  }
  showDash (id: number) {
    this.router.navigate(['/dash', id]);
    
  }
  flechaVolver() {
    this.router.navigate(['login']);
  }

}
