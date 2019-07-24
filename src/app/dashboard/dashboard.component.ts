import { Component, OnInit, SimpleChanges, Input, ViewChild, Renderer2, ElementRef, asNativeElements} from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/Task';
import { TASK_STATE } from 'src/environments/environment';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { element } from '@angular/core/src/render3';


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
    //porcentaje = 0;
    contenido: Task[] = [];
    tituloTabla;
    res: String;

    // arrays Tareas
    // todas las tareas
    tasks: Task[];
    // tareas finalizadas
    tasksFinished: Task[];
    // tareas en curso
    tasksInProgress: Task[];
    // todas las tareas atrasadas
    allTaskDelayed: Task[] = [];
    // tareas atrasadas según fecha de termino
    tasksDelayedEnd: Task[] = [];

    perReal: String;
    perPlanif: String;

    @Input() idProject: number;
    real: ElementRef;
    planif: ElementRef;

    //variables coni
    /**
     * 
     * @param taskService servicio que se conecta con el endpoint que trae las tareas, menos las finalizadas
     * @param modalService servicio que abre y agrega datos a los modal que son necesarios, es ideal que esten todos los modal centralizados en este servicio
     */
    constructor(
        private taskService: TaskService,
        private authService: AuthService,
        private render: Renderer2,
        private elRef: ElementRef
    ) { }

    /**
     * al iniciar el componente consulta por la resolucion de pantalla y se subscribe al socket
     * el socket al momento de detectar un cambio modifica el valor de las tareas (si es que el usuario se encuentra en esa vista y si la 
     * tarea no esta finalizada)
     */
    async ngOnInit() {
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
        this.real = this.elRef.nativeElement.querySelector('.progress-bar');
        this.planif = this.elRef.nativeElement.querySelector('.w3-container');

    }

    /**
       * 
       * @param changes los posibles cambios que pueden exisir
       * se necesita verificar que el cambi oque gatilla este método sea el cambio de projecto
       * lo que realiza es llamar a servicio que muestra las tareas
       */
    ngOnChanges(changes: SimpleChanges) {
        this.allTaskDelayed = [];
        this.tasksDelayedEnd = [];
        this.tasks = [];
        this.tasksFinished = [];
        this.tasksInProgress = [];
        this.perReal = '';
        this.perPlanif = '';
        this.getAllTasks(this.idProject);    

    }
    //funcion de prueba (CONI)
    /*mostrar() {
        console.log('mostre tabla');
        return this.tabla = true;
    }*/
    mostrarTabla(lista: Task[]) {
        console.log('mostre tabla')
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
    atras() {
        console.log("volvi a los botones");
        this.botones = true;
        this.tabla = false;
    }
    /**
     * solamente llama al servicio que obtiene todas las tareas 
     */
    showTasks(idProject: number) {
        let tasks: Task[];
        this.taskService.getTasks(1, idProject)
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
        this.taskService.getTasks(1, idProject, TASK_STATE.FINISHED)
            // resp is of type
            .subscribe((
                resp: Task[]) => {
                tasks = resp ? resp : [];
                this.tasksFinished = tasks;
                let porcenta = Math.round((this.tasksFinished.length * 100) / this.tasks.length) + "%";
                this.perReal = porcenta;
                this.render.setStyle(this.real, 'width', this.perReal);


            });
    }

    getAllTaskDelayed(idProject: number) {
        // x dependencia
        this.taskService.getTasks(1, idProject, TASK_STATE.DELAYED_BY_DEPENDENCY)
            // resp is of type
            .subscribe((resp: Task[]) => {
                this.allTaskDelayed.push(...resp);
                for (let task of resp) {
                    if (new Date(task.endDatePlanning) < new Date()) {
                        this.tasksDelayedEnd.push(task);
                    }
                }
            });

        // x inicio
        this.taskService.getTasks(1 ,idProject, TASK_STATE.DELAYED_BY_START)
            // resp is of type
            .subscribe((resp: Task[]) => {
                this.allTaskDelayed.push(...resp);
                for (let task of resp) {
                    if (new Date(task.endDatePlanning) < new Date()) {
                        this.tasksDelayedEnd.push(task);
                    }
                }
            });    
          
        // x fin
        this.taskService.getTasks(1, idProject, TASK_STATE.DELAYED_BY_FINISH)
            // resp is of type
            .subscribe((resp: Task[]) => {
                this.allTaskDelayed.push(...resp);
                this.tasksDelayedEnd.push(...resp);
            })    

        let cont = this.tasksDelayedEnd.length + this.tasksFinished.length;  
        this.perPlanif = Math.round((cont * 100) / this.tasks.length) + "%";

    }

    /**
     * llama al servicio que obtiene las tareas en curso y las almacena en un array
     * también busca las que ya pasaron su fecha de termino planificada
     * y las guarda en otro.
     * @param idProject 
     */
    getTasksInProgress(idProject: number) {
        this.taskService.getTasks(1, idProject, TASK_STATE.IN_PROGRESS)
            // resp is of type
            .subscribe((resp: Task[]) => {
                this.tasksInProgress = resp ? resp : [];
            });
    }
    showPlanif() {
        let cont = this.tasksDelayedEnd.length + this.tasksFinished.length;
        return cont + ' / ' + this.tasks.length;
    }
    showReal() {
        return this.tasksFinished.length + ' / ' + this.tasks.length;
    }

    getAllTasks(idProject: number) {
        this.showTasks(idProject);
        this.showTasksFinished(idProject);
        this.getAllTaskDelayed(idProject);
        this.getTasksInProgress(idProject);

    }



    // porcentajePlanif() {
    //     let cont = this.deberiaDepen.length + this.deberiaInicio.length + this.deberiaInProgress.length + this.tasksFinished.length;
    //     //console.log(cont);
    //     this.porcentajePla = "" + Math.round(((cont)*100) / (this.tasks.length)) + "%";
    //     return this.porcentajePla;
    // }
    
} 
