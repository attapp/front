import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WebsocketService } from './websocket.service';

/**
 * Servicio que interactua con el back el cual obtiene, modifica e interactua con los sockets
 */
@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient, private socketService: WebsocketService) { }


    getTasks(idProject: number, state?: number) {
        let getTasksUrl = environment.API_ENDPOINT + `/projects/${idProject}/tasks`;

        if (state) {
            getTasksUrl = getTasksUrl + `?state=${state}`;
            return this.http.get(getTasksUrl);
        }
        else 
            return this.http.get(getTasksUrl);
    }

    getTaskByUser(idProject: number, idUser: number) {
        let getTasksUrl = environment.API_ENDPOINT + `/projects/${idProject}/tasks/${idUser}`;
            return this.http.get(getTasksUrl);
    }

    setTask(idProject: number, idTask: number, stateTask: number) {
        const setTaskUrl = environment.API_ENDPOINT + `/projects/${idProject}/tasks/${idTask}`;
        const body = { stateTask };
        return this.http.patch(setTaskUrl, body);
    }

    getSocketTask(idSocket: string) {
        return this.socketService.listen(idSocket);

    }
}
