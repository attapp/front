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
import { AuthService } from '../services/auth.service';

/**
 * Componente que muestra el listado de tareas con sus respectivas funcionalidades,
 * en este componente se encuentra la vista mobile y la de escritorio que viene dada por el servicio aplicationStateService
 */
@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

    tasks: Task[];
    @Input() idProject: number;
    @Input() idUser: number;
    interval;
    page = 1;
    pageSize = 50;
    isMobileResolution: boolean;

    profile: string = localStorage.getItem('currentProfile'); 

    /**
     * 
     * @param taskService servicio que se conecta con el endpoint que trae las tareas, menos las finalizadas
     * @param modalService servicio que abre y agrega datos a los modal que son necesarios, es ideal que esten todos los modal centralizados en este servicio
     * @param titleCase Pipe que sirve para capitalizar los nombres, ej juan perez lo deja como Juan Perez
     * @param applicationStateService Servicio que obtiene el tamaño de la pantalla y en base a eso modifica la estructura html
     */
    constructor(
        private taskService: TaskService,
        private modalService: ModalService,
        private titleCase: TitleCasePipe,
        private applicationStateService: ApplicationStateService,
        private authService: AuthService
    ) { }

    /**
     * al iniciar el componente consulta por la resolucion de pantalla y se subscribe al socket
     * el socket al momento de detectar un cambio modifica el valor de las tareas (si es que el usuario se encuentra en esa vista y si la 
     * tarea no esta finalizada)
     */
    ngOnInit() {
        this.taskService.getSocketTask('message').subscribe(
            projectTask => {
                console.log('====>', projectTask);

                const tasks: Task[] = projectTask[this.idProject] ? projectTask[this.idProject] : [];
                tasks.forEach(newTask => {
                    const index = this.tasks.findIndex((t) => t.id === newTask.id);
                    this.tasks[index] = newTask;
                    if (newTask.state.id === TASK_STATE.FINISHED) {
                        this.removeFinished(newTask.id);
                    }
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
     * solamente llama al servicio que obtiene las tareas menos las tareas finalizadas
     */
    showTasks(idProject: number) {
        this.taskService.getTasks(idProject, -TASK_STATE.FINISHED)
            // resp is of type
            .subscribe((resp: Task[]) => {
                this.tasks = resp ? resp : [];
            });
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
                    this.callSetTask(this.idProject, task.id, TASK_STATE.FINISHED);
                }
            }).catch((e) => console.log(e));
        }

    }

    /**
     * 
     * @param removeItem id de tarea finalizada, sirve para quitarla de la lista
     */
    removeFinished(removeItem: number) {
        this.tasks.splice(this.tasks.findIndex((t) => t.id === removeItem), 1);
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

    /**
     * método que muestra el bótón de iniciar o finalizar como activo o inactivo
     * @param state valida el estado
     */
    validateState(state: number): boolean {
        switch (state) {
            case TASK_STATE.NOT_START:
            case TASK_STATE.DELAYED_BY_START:
            case TASK_STATE.IN_PROGRESS:
            case TASK_STATE.DELAYED_BY_FINISH:
                return false;
            default:
                return true;
        }
    }

    /**
     * Sirve para modificar el color de fondo de la tabla en la vista desktop, lo modifica con respecto al estado que presente
     * @param idState el id del estado
     */
    changeCss(idState: number): string {
        switch (idState) {
            case TASK_STATE.NOT_START:
                return 'table-default';
            case TASK_STATE.NOT_START_FOR_DEPENDENCY:
                return 'table-secondary';
            case TASK_STATE.IN_PROGRESS:
                return 'table-success';
            case TASK_STATE.DELAYED_BY_START:
            case TASK_STATE.DELAYED_BY_FINISH:
                return 'table-danger';
            case TASK_STATE.DELAYED_BY_DEPENDENCY:
                return 'table-warning';
            case TASK_STATE.FINISHED:
                return 'table-primary';
            default:
                return '';
        }
    }

    /**
     *  Modifica el nombre del botón con respecto a su estado.
     * @param state dependiendo del estado cambia el nombre como inicar o finalizar
     */
    changeStateName(state: State): string {
        switch (state.id) {
            case TASK_STATE.NOT_START:
                return "No iniciada";
            case TASK_STATE.NOT_START_FOR_DEPENDENCY:
                return "No iniciada por dependencia";
            case TASK_STATE.IN_PROGRESS:
                return "En progreso";
            case TASK_STATE.DELAYED_BY_START:
                return "Atrasada por inicio";
            case TASK_STATE.DELAYED_BY_DEPENDENCY:
                return "Atrasada por dependencia";    
            case TASK_STATE.DELAYED_BY_FINISH:
                return "Atrasada por fin";
        }
    }

    /**
     *  Modifica el nombre del botón con respecto a su estado.
     * @param state dependiendo del estado cambia el nombre como inicar o finalizar
     */
    changeButtonName(state: State): string {
        switch (state.id) {
            case TASK_STATE.NOT_START:
            case TASK_STATE.DELAYED_BY_START:
                return 'Iniciar';
            case TASK_STATE.IN_PROGRESS:
            case TASK_STATE.DELAYED_BY_FINISH:
                return 'Finalizar';
            default:
                return 'Iniciar';
        }
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
