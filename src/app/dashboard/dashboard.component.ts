import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/Task';
import { TASK_STATE } from 'src/environments/environment';
import { State } from '../interfaces/State';
import { Responsible } from '../interfaces/Responsible';
import { TitleCasePipe } from '@angular/common';
import { ApplicationStateService } from '../services/application-state.service';
import { ModalService } from '../services/modal.service';
import { ProjectService } from '../services/project.service';
import { Project } from '../interfaces/Project';
import { AuthService } from '../services/auth.service';


/**
 * Componente que muestra el combobox con los distintos proyectos
 * es el componente padre de los tabs 
 */

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {    
    
  tasks: Task[];
  @Input() idProject: number;
  isMobileResolution: boolean;
  contadorFinalizadas = 70;
  contadorTotal = 100;
  private projects: Project[];
  public projectId = '';
  private idUser = this.authService.usserLogged.id;


  /**
   * 
   * @param taskService servicio que se conecta con el endpoint que trae las tareas, menos las finalizadas
   * @param modalService servicio que abre y agrega datos a los modal que son necesarios, es ideal que esten todos los modal centralizados en este servicio
   * @param applicationStateService Servicio que obtiene el tamaño de la pantalla y en base a eso modifica la estructura html
   */
  constructor(
      private taskService: TaskService,
      private modalService: ModalService,
      private applicationStateService: ApplicationStateService,
      private proyectService: ProjectService,
      private authService: AuthService
  ) { }

  /**
   * al iniciar el componente consulta por la resolucion de pantalla y se subscribe al socket
   * el socket al momento de detectar un cambio modifica el valor de las tareas (si es que el usuario se encuentra en esa vista y si la 
   * tarea no esta finalizada)
   */
  ngOnInit() {
      console.log("PERFIL " + this.projectId)
      this.showProjectsByUser(this.idUser);
      this.isMobileResolution = this.applicationStateService.getIsMobileResolution();
      this.taskService.getSocketTask('message').subscribe(
          projectTask => {
              console.log('====>', projectTask);

              const tasks: Task[] = projectTask[this.idProject] ? projectTask[this.idProject] : [];
              tasks.forEach(newTask => {
                  const index = this.tasks.findIndex((t) => t.id === newTask.id);
                  this.tasks[index] = newTask;
              });
          });
  }
/**
   * 
   * @param changes los posibles cambios que pueden exisir
   * se necesita verificar que el cambi oque gatilla este método sea el cambio de projecto
   * lo que realiza es llamar a servicio que muestra las tareas
   */
  ngOnChanges(changes: SimpleChanges): void {
      this.showTasks(this.idProject);
  }

  /**
     * 
     * @param id muestra los cambios en el proyecto
     */
    change(id: number) {
        console.log("projectID change", this.projectId);

    }

  showProjectsByUser(idUser: number) {
    this.proyectService.getProjectsByUser(idUser)
        // resp is of type
        .subscribe((resp: Project[]) => {
            this.projects = resp;
        });
}

  /**
   * solamente llama al servicio que obtiene las tareas menos las tareas finalizadas
   */
  showTasks(idProject: number) {
      this.taskService.getTasks(idProject)
          // resp is of type
          .subscribe((resp: Task[]) => {
              this.tasks = resp ? resp : [];
              return resp.length;
          });
  }
  /**
   * solamente llama al servicio que obtiene las tareas finalizadas
   */
  showTasksFinished(idProject: number) {
    this.taskService.getTasks(idProject, TASK_STATE.FINISHED)
        // resp is of type
        .subscribe((resp: Task[]) => {
            this.tasks = resp ? resp : [];
        });
  }
  
  showReal(total) {
    return this.showTasksFinished.length + ' / ' + total;
  }

  showPlanif(finalizadas, total) {
    return finalizadas + ' / ' + total;
  }
  /**
   * actualiza las tareas, en caso de pasar a un estado no finalizado lo realiza inmediatamente llamando 
   * al método callSetTask, en caso de ser una tarea que va a finalizar, este llama a los dos modal, uno indicando 
   * si realmente desea finalizar la tarea y el siguiente es el que indica que la tarea ha sido finalizada
   */
  updateTask(task: Task) {
      // 1 y 4 pasan a 3,
      // 3 y 6 pasan a 7

      if (task.state.id === TASK_STATE.NOT_START || task.state.id === TASK_STATE.DELAYED_BY_START) {
          this.callSetTask(this.idProject, task.id, TASK_STATE.IN_PROGRESS);

      }
  }  

  /**
   * Modifica el estado de una tarea, llama al servicio que realiza el cambio
   * @param idProject el id del proyecto
   * @param idTask el id de la tarea a modificar
   * @param idState el estado por el cual se desea cambiar
   */
    callSetTask(idProject: number, idTask: number, idState: number) {
      this.taskService.setTask(idProject, idTask, idState).subscribe();
    }
  }
