import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Task } from '../interfaces/Task';
import { TASK_STATE } from 'src/environments/environment';
import { TaskService } from '../services/task.service';
import { Responsible } from '../interfaces/Responsible';
import { TitleCasePipe } from '@angular/common';
import * as moment from 'moment';

/**
 * Componente que muestra las tareas finalizadas en la pestaña
 */
@Component({
    selector: 'app-completed-tasks',
    templateUrl: './completed-tasks.component.html',
    styleUrls: ['./completed-tasks.component.scss']
})
export class CompletedTasksComponent implements OnInit {

    public tasks: Task[] = [];
    @Input() idProject: number;
    private interval;
    private page = 1;
    private pageSize = 50;
    private tableNames = ['ID', 'Descripción', 'Inicio Real', 'Fin planificado', 'Fin Real', 'Responsable', 'Area', 'Desvío'];


    /**
     * 
     * @param taskService servicio que obtiene las tareas
     * @param titleCase Pipe o tuberia que capitaliza los nombres ej: juan perez => Juan Perez
     */
    constructor(private taskService: TaskService, private titleCase: TitleCasePipe) { }

    /**
     * AL iniciar el componente este se subcribe al socket
     */
    ngOnInit() {
        this.taskService.getSocketTask('message').subscribe(
            projectTask => {
                console.log('====>', projectTask);

                let tasks: Task[] = projectTask[this.idProject] ? projectTask[this.idProject] : [];
                tasks = tasks.filter(task => task.state.id === TASK_STATE.FINISHED);
                tasks.forEach(task => task.variance = moment.duration(moment(task.realEndDate).diff(task.endDatePlanning)));
                this.tasks.push(...tasks);
            });

    }

    /**
     * @param changes los posibles cambios que pueden exisir
     * se necesita verificar que el cambi oque gatilla este método sea el cambio de projecto
     * lo que realiza es llamar a servicio que muestra las tareas
     */
    ngOnChanges(changes: SimpleChanges): void {
        this.showTasks(this.idProject);
    }

    /**
     * 
     * @param idProject 
     */
    showTasks(idProject: number) {
        this.taskService.getTasks(idProject, TASK_STATE.FINISHED)
            // resp is of type
            .subscribe((resp: Task[]) => {
                this.tasks = resp ? resp : [];
                this.tasks.forEach(
                    task => task.variance = moment.duration(moment(task.realEndDate).diff(task.endDatePlanning)));
            });
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

    /**
     * utiliza la libreria moment para entregar el resultado
     * se muestra en la pantalla el tiempo 'humanizado' diciendo por ejemplo 2 minutos o 3 horas, etc.
     */
    getVariance(task) {
        const variance = task.variance as moment.Duration;
        return `${variance.locale('es').humanize()}`;
    }

    /**
     * Se agrega a la clase de font awesome, el icono que indica una flecha verde hacia arriba 
     * una flecha roja hacia abajo
     * y un signo menos amarillo cuando pasa menos de un minuto
     * @param task la tarea que se esta consultando
     */
    getClassVariance(task) {
        const variance = task.variance as moment.Duration;
        const hours = variance.asHours();
        const minutes = variance.asMinutes() - variance.asHours() * 60;
        if (variance.asMinutes() < 0) {
            return 'fa-arrow-up text-success';
        } else if (variance.asMinutes() === 0) {
            return 'fa-minus text-warning';
        } else {
            return 'fa-arrow-down text-danger';
        }
    }

}
