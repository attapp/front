import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { of } from 'rxjs';
import { Task } from '../interfaces/Task';
import { HttpErrorResponse } from '@angular/common/http';
import { WebsocketService } from './websocket.service';

describe('TaskService', () => {
    let httpClientSpy: { get: jasmine.Spy, patch: jasmine.Spy };
    let taskService: TaskService;

    beforeEach(() => {
        // TODO: spy on other methods too
        const service: WebsocketService = TestBed.get(WebsocketService);
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'patch']);
        taskService = new TaskService(httpClientSpy as any, service);
    });


    it('should be created', () => {
        expect(taskService).toBeTruthy();
    });

    it('should return expected tasks (HttpClient called once)', () => {
        const expectedTasks: Task[] =
            [{
                id: 20,
                description: 'Ejecutar Script',
                startDatePlanning: new Date('2019-04-11T20:00:00.000Z'),
                endDatePlanning: new Date('2019-04-11T20:15:00.000Z'),
                area: {
                    id: 1,
                    description: 'TI',
                    client: null
                },
                project: {
                    id: 2,
                    description: 'a',
                    name: 'RENEGOCIADOS'
                },
                externalCode: 'SEC - 001',
                realStartDate: null,
                realEndDate: null,
                state: {
                    id: 1,
                    description: 'No iniciada'
                },
                responsible: null,
                dependencies: []
            }];

        httpClientSpy.get.and.returnValue(of(expectedTasks));

        taskService.getTasks(1).subscribe(
            projects => expect(projects).toEqual(expectedTasks, 'expected heroes'),
            fail
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('should set expected task (HttpClient called once)', () => {
        const expectedTasks = { };
        httpClientSpy.patch.and.returnValue(of(expectedTasks));

        taskService.setTask(1, 1, 3).subscribe(
            task => expect(task).toEqual(expectedTasks, 'expected heroes'),
            fail
        );
        expect(httpClientSpy.patch.calls.count()).toBe(1, 'one call');
    });


    xit('should return an error when the server returns a 404', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404, statusText: 'Not Found'
        });

        httpClientSpy.get.and.returnValue(of(errorResponse));

        taskService.getTasks(1).subscribe(
            project => fail('expected an error, not projects'),
            error => expect(error.message).toContain('test 404 error')
        );
    });
});
