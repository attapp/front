import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/Task';
import { TASK_STATE } from 'src/environments/environment';
import { ModalService } from '../services/modal.service';
//import * as moment from 'moment';
import { AuthService } from '../services/auth.service';
import { max } from 'moment';
import { min } from 'rxjs/operators';


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
    //variables de prueba
    botones = true;
    tabla = false;
    porcentaje = 0;
    contenido: Task[] = [];
    pageSize = 5;
    tituloTabla;

    // arrays Tareas
    tasks: Task[];
    tasksFinished: Task[];
    tasksAtraXDepen: Task[];
    tasksAtraXInicio: Task[];
    tasksInProgress: Task[];
    allTaskDelayed: Task[] = [];

    deberiaDepen: Task[] = [];
    deberiaInicio: Task[] = [];
    deberiaInProgress: Task[] = [];

    endPlaning: Task[];
    @Input() idProject: number;
    isMobileResolution: boolean;

    //variables coni
    /**
     * 
     * @param taskService servicio que se conecta con el endpoint que trae las tareas, menos las finalizadas
     * @param modalService servicio que abre y agrega datos a los modal que son necesarios, es ideal que esten todos los modal centralizados en este servicio
     */
    constructor(
        private taskService: TaskService,
        private modalService: ModalService,
        private authService: AuthService
    ) { }

    /**
     * al iniciar el componente consulta por la resolucion de pantalla y se subscribe al socket
     * el socket al momento de detectar un cambio modifica el valor de las tareas (si es que el usuario se encuentra en esa vista y si la 
     * tarea no esta finalizada)
     */
    ngOnInit() {
        //this.idProject = parseInt(localStorage.getItem('currentProyect'));
        //console.log('PROYECTO LOCAL : ' + localStorage.getItem('currentProyect'));
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
    async ngOnChanges(changes: SimpleChanges): Promise<void> {
        // this.idProject = parseInt(localStorage.getItem('currentProyect'));
        // console.log('ID PROYECT : ' + this.idProject)
        this.allTaskDelayed = [];
        this.tasks = [];
        this.tasksAtraXDepen = [];
        this.tasksAtraXInicio = [];
        this.tasksFinished = [];
        this.tasksInProgress = [];
        this.deberiaDepen = [];
        this.deberiaInicio = [];
        this.deberiaInProgress = [];
        await this.showTasks(this.idProject);
        await this.showTasksFinished(this.idProject);
        console.log(this.porcentajeReal());
        this.getTasksDelayedByDependency(this.idProject);
        this.getTasksDelayedByStart(this.idProject);
        this.getTasksInProgress(this.idProject);
        // console.log('termina onchange');
    }

    //funcion de prueba (CONI)
    llamarTabla(lista: Task[]) {
        this.botones = false;
        this.tabla = true;

        if (lista === this.allTaskDelayed) {
            this.tituloTabla = 'DETALLE TAREAS ATRASADAS';
            this.contenido = this.allTaskDelayed;
        } else if (lista === this.tasksInProgress) {
            this.tituloTabla = 'DETALLE TAREAS EN CURSO';
            this.contenido = this.tasksInProgress;
        }

    } 

    //funcion volver 
    volver() {
        console.log("vamos de vuelta");
        this.botones = true;
        this.tabla = false;
    }
    /**
     * solamente llama al servicio que obtiene todas las tareas 
     */
    showTasks(idProject: number) {
        let tasks: Task[];        
        this.taskService.getTasks(idProject)
            // resp is of type
            .subscribe((
                resp: Task[]) => {
                tasks = resp ? resp : [];
                this.tasks = tasks;
            });
    }
    /**
     * solamente llama al servicio que obtiene las tareas finalizadas
     */
    showTasksFinished(idProject: number) {
        let tasks: Task[];
        this.taskService.getTasks(idProject, TASK_STATE.FINISHED)
            // resp is of type
            .subscribe((
                resp: Task[]) => {
                tasks = resp ? resp : [];
                this.tasksFinished = tasks;
            });
    }
    /**
     * llama al servicio que obtiene las tareas Atrasadas por dependencia y las almacena en un array
     * también busca las que ya pasaron su fecha de termino planificada
     * y las guarda en otro.
     * @param idProject 
     */
    getTasksDelayedByDependency(idProject: number) {
        this.taskService.getTasks(idProject, TASK_STATE.DELAYED_BY_DEPENDENCY)
            // resp is of type
            .subscribe((resp: Task[]) => {
                this.tasksAtraXDepen = resp ? resp : [];
                this.allTaskDelayed.push(...this.tasksAtraXDepen);
                for (let task of resp) {
                    if (new Date(task.endDatePlanning) < new Date()) {
                        this.deberiaDepen.push(task);
                    }
                }
            });

    }
    /**
     * llama al servicio que obtiene las tareas Atrasadas por inicio y las almacena en un array
     * también busca las que ya pasaron su fecha de termino planificada
     * y las guarda en otro.
     * @param idProject 
     */
    getTasksDelayedByStart(idProject: number) {
        this.taskService.getTasks(idProject, TASK_STATE.DELAYED_BY_START)
            // resp is of type
            .subscribe((resp: Task[]) => {
                this.tasksAtraXInicio = resp ? resp : [];
                this.allTaskDelayed.push(...this.tasksAtraXInicio);

                for (let task of resp) {
                    if (new Date(task.endDatePlanning) < new Date()) {
                        this.deberiaInicio.push(task);
                    }
                }
            });
    }
    /**
     * llama al servicio que obtiene las tareas en curso y las almacena en un array
     * también busca las que ya pasaron su fecha de termino planificada
     * y las guarda en otro.
     * @param idProject 
     */
    getTasksInProgress(idProject: number) {
        this.taskService.getTasks(idProject, TASK_STATE.IN_PROGRESS)
        // resp is of type
        .subscribe((resp: Task[]) => {
            this.tasksInProgress = resp ? resp : [];

            for (let task of resp) {
                if (new Date(task.endDatePlanning) < new Date()) {
                    this.deberiaInProgress.push(task);
                }
            }
            this.allTaskDelayed.push(...this.deberiaInProgress);
        });
    }

    porcentajeReal() {
        /*console.log("task: ",this.tasksFinished.length);
        var algo = this.tasksFinished;
        console.log("algo: ",algo);*/
        return '30%';
        return Math.round(((this.tasksFinished.length) * 100) / (this.tasks.length)) + "%";

    }


    showReal() {
        return this.tasksFinished.length + ' / ' + this.tasks.length;
    }

    showPlanif() {
        //this.filtroEndPlaning(dependencys, byStart, inProgress)
        let cont = this.deberiaDepen.length + this.deberiaInicio.length + this.deberiaInProgress.length + this.tasksFinished.length;
        return cont + ' / ' + this.tasks.length;
    }

   /* showDelayed() {
        this.allTaskDelayed.push(...this.tasksAtraXDepen);
        this.allTaskDelayed.push(...this.tasksAtraXInicio);
        this.allTaskDelayed.push(...this.tasksInProgress);
    }*/
} 
