import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/Task';
import { TASK_STATE } from 'src/environments/environment';
import { element } from '@angular/core/src/render3';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //hacer referencia a una etiqueta de html
  @ViewChild('real') element: ElementRef;
   

    tasks: Task[];    
    @Input() idProject: number;

  /**
     * 
     * @param taskService servicio que se conecta con el endpoint que trae las tareas, menos las finalizadas
     * @param modalService servicio que abre y agrega datos a los modal que son necesarios, es ideal que esten todos los modal centralizados en este servicio
     * @param titleCase Pipe que sirve para capitalizar los nombres, ej juan perez lo deja como Juan Perez
     * @param applicationStateService Servicio que obtiene el tamaño de la pantalla y en base a eso modifica la estructura html
     */
    constructor(
      private taskService: TaskService,
      //private modalService: ModalService,
      //private titleCase: TitleCasePipe,
      //private applicationStateService: ApplicationStateService
  ) { }

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

  // MODIFICAR PARA CAPTURAR
  removeFinished(removeItem: number) {
    this.tasks.splice(this.tasks.findIndex((t) => t.id === removeItem), 1);
}

}
