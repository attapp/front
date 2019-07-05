import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/Task';
import { TASK_STATE } from 'src/environments/environment';
import { ModalService } from '../services/modal.service';
import { Responsible } from '../interfaces/Responsible';
import { TitleCasePipe } from '@angular/common';
import { CompletedTasksComponent } from '../completed-tasks/completed-tasks.component';
import { TaskComponent } from '../task/task.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    tasks: Task[];
    tasksDelayedDependFin: Task[];
    tasksDelayedStartFin: Task[];
    contador: number;   
    @Input() idProject: number;

  /**
     * 
     * @param taskService servicio que se conecta con el endpoint que trae las tareas, menos las finalizadas
     * @param modalService servicio que abre y agrega datos a los modal que son necesarios, es ideal que esten todos los modal centralizados en este servicio
     * @param titleCase Pipe que sirve para capitalizar los nombres, ej juan perez lo deja como Juan Perez
     */
    constructor(
      private taskService: TaskService,
      private modalService: ModalService,
      private titleCase: TitleCasePipe,
      private tasksComponent: TaskComponent,
      private completedtasksComponent: CompletedTasksComponent
  ) { }

  ngOnInit() {
        this.taskService.getSocketTask('message').subscribe(
            projectTask => {
                console.log('====>', projectTask);

                const tasks: Task[] = projectTask[this.idProject] ? projectTask[this.idProject] : [];
                tasks.forEach(newTask => {
                    const index = this.tasks.findIndex((t) => t.id === newTask.id);
                    this.tasks[index] = newTask;
                    /*if (newTask.state.id === TASK_STATE.FINISHED) {
                      this.removeFinished(newTask.id);
                    }*/
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
        this.showTasksFinished(this.idProject);
    }
    
    /**
     * @param idProject
     * solamente llama al servicio que obtiene las tareas menos las tareas finalizadas
     * ---- EDITAR PARA OBTENER SOLO LOS DATOS QUE NECESITO---- 
     */
    showTasks(idProject: number) {
      this.taskService.getTasks(idProject, -TASK_STATE.FINISHED)
          // resp is of type
          .subscribe((resp: Task[]) => {
              this.tasks = resp ? resp : [];
          });
    }
    
    /** 
     * arroja total de tareas que debiesen estar finalizadas por planificacion.
     */
    showCantFinishedByPlanif() {
      console.log('TASKS DEPENDENCY ' + this.tasksDelayedDependFin + ' CONTADOR :' + this.tasksDelayedDependFin.length);
      console.log('TASKS START ' + this.tasksDelayedStartFin + ' CONTADOR :' + this.tasksDelayedStartFin.length);
      console.log('TASKS DEPENDENCY ' + this.completedtasksComponent.tasks + ' CONTADOR :' + this.completedtasksComponent.tasks.length);

      this.contador = this.tasksDelayedDependFin.length + this.tasksDelayedStartFin.length + this.completedtasksComponent.showTasks.length;
    }

    /**
     * llama a la funcion (showTask) del componente Completed Task, para traer tareas finalizadas
     */
    showTasksFinished(idProject: number) {
      this.completedtasksComponent.showTasks(idProject);
    }

    /**
     * obtiene y almacena las tareas atrasadas por dependencia y por inicio
     * que ya pasaron su fecha de finalización por planificación, y aún se encuentran atrasadas
     */
    showTasksFinishedByPlanif(idProject: number) {
      this.obtenerTasksByState(idProject, TASK_STATE.DELAYED_BY_DEPENDENCY, this.tasksDelayedDependFin);
      this.obtenerTasksByState(idProject, TASK_STATE.DELAYED_BY_START, this.tasksDelayedStartFin);
    }

    /**
     * @param idProject 
     * @param state 
     * @param tasks 
     * trae tareas según id de proyecto, estado, y las almacena en un array
     */
    obtenerTasksByState(idProject: number, state: number, tasks: Task[]) {
      this.taskService.getTasks(idProject, state)
          // resp is of type
          .subscribe((resp: Task[]) => {
            resp.forEach((task: Task) => {
              let endDateP = task.endDatePlanning;
              if (endDateP < new Date) {
                tasks.push(task)
              }
            })
           })
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

      } else if (task.state.id === TASK_STATE.IN_PROGRESS || task.state.id === TASK_STATE.DELAYED_BY_FINISH) {
          // llamar a modal y depende de lo que haga finalizo o no la tarea
          const modalConfirm = this.modalService.openModalConfirm(
              { backdrop: 'static', centered: true, keyboard: true },
              `¿Seguro que deseas finalizar la tarea ${task.externalCode}?`,
              task.description,
              'Esta tarea desaparecerá del listado'
          );

          modalConfirm.result.then((result: boolean) => {
              if (result) {
                  const modalInfo = this.modalService.openModalInfo(
                      { backdrop: 'static', centered: true, keyboard: true },
                      'Tarea finalizada correctamente'
                  );
                  modalInfo.result.then();
                  this.callSetTask(this.idProject, task.id, TASK_STATE.FINISHED);
              }
          }).catch((e) => console.log(e));
      }

  }

  /*removeFinished(removeItem: number) {
    this.tasks.splice(this.tasks.findIndex((t) => t.id === removeItem), 1);
  }*/

    /**
     * Modifica el estado de una tarea, llama al servicio que realiza el cambio
     * @param idProject el id del proyecto
     * @param idTask el id de la tarea a modificar
     * @param idState el estado por el cual se desea cambiar
     */
    callSetTask(idProject: number, idTask: number, idState: number) {
      this.taskService.setTask(idProject, idTask, idState).subscribe();
  }

  /**
     * Verifica si el responsable tiene nombre, en caso de no tenerlo muestra el email por defecto
     * en caso de tener el nombre Capitaliza el nombre (juan perez => Juan Perez):
     * @param responsible el responsable
     */
    getNameResponsible(responsible: Responsible) {
      const name = responsible.name || '';
      if (name.length === 0) {
          return responsible.email;
      } else {
          return this.titleCase.transform(name);
      }
  }
}
