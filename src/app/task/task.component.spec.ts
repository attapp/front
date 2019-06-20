import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TruncatePipe } from '../utils/pipes/truncate.pipe';
import { HttpClientModule } from '@angular/common/http';
import { TASK_STATE } from 'src/environments/environment';
import { Responsible } from '../interfaces/Responsible';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { TitleCasePipe } from '@angular/common';

fdescribe('TaskComponent', () => {
    let component: TaskComponent;
    let fixture: ComponentFixture<TaskComponent>;
    const config: SocketIoConfig = {url: 'http://localhost:4200', options: {}};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                NgbModule,
                FormsModule,
                SocketIoModule.forRoot(config)
            ],
            declarations: [TaskComponent, TruncatePipe],
            providers: [TitleCasePipe]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('validateState various numbers', () => {
        // falsos
        const state = component.validateState(TASK_STATE.NOT_START);
        const state1 = component.validateState(TASK_STATE.DELAYED_BY_START);
        const state2 = component.validateState(TASK_STATE.IN_PROGRESS);
        const state3 = component.validateState(TASK_STATE.DELAYED_BY_FINISH);
        // verdaderos
        const state4 = component.validateState(TASK_STATE.DELAYED_BY_DEPENDENCY);
        const state5 = component.validateState(TASK_STATE.FINISHED);
        const state6 = component.validateState(TASK_STATE.NOT_START_FOR_DEPENDENCY);

        // expect falsos
        expect(state).toBeFalsy();
        expect(state1).toBeFalsy();
        expect(state2).toBeFalsy();
        expect(state3).toBeFalsy();

        // expect verdaderos
        expect(state4).toBeTruthy();
        expect(state5).toBeTruthy();
        expect(state6).toBeTruthy();

    });

    it('changeCss various states', () => {
        // falsos
        const state = component.changeCss(TASK_STATE.NOT_START);
        const state1 = component.changeCss(TASK_STATE.DELAYED_BY_START);
        const state2 = component.changeCss(TASK_STATE.IN_PROGRESS);
        const state3 = component.changeCss(TASK_STATE.DELAYED_BY_FINISH);
        // verdaderos
        const state4 = component.changeCss(TASK_STATE.DELAYED_BY_DEPENDENCY);
        const state5 = component.changeCss(TASK_STATE.FINISHED);
        const state6 = component.changeCss(TASK_STATE.NOT_START_FOR_DEPENDENCY);

        expect(state).toEqual('');
        expect(state1).toEqual('table-danger');
        expect(state2).toEqual('table-success');
        expect(state3).toEqual('table-danger');
        expect(state4).toEqual('table-warning');
        expect(state5).toEqual('table-primary');
        expect(state6).toEqual('table-secondary');

    });

    xit('Update task ', () => {
        const task = {
            id: 20,
            description: 'Ejecutar Script',
            startDatePlanning: new Date('2019-04-11T20:00:00.000Z'),
            endDatePlanning: new Date('2019-04-11T20:15:00.000Z'),
            area: {
                id: 1,
                description: 'TI'
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
            dependencies: []
        };

        //const updateTask = component.updateTask(task);
        //expect(updateTask).toBeDefined();
    });

    it('getNameReponsible with name', () => {
        const responsible: Responsible = {
            id: 1,
            client: null,
            name: 'nombre responsable',
            email: 'email@responsable',
            phone: '1111'
        };

        expect(component.getNameResponsible(responsible)).toBe('Nombre Responsable');
    });

    it('getNameReponsible name is null', () => {
        const responsible: Responsible = {
            id: 1,
            name: null,
            client: null,
            email: 'email@responsable',
            phone: '1111'
        };

        expect(component.getNameResponsible(responsible)).toBe('email@responsable');
    });

    it('getNameReponsible name is empty', () => {
        const responsible: Responsible = {
            id: 1,
            name: '',
            client: null,
            email: 'email@responsable',
            phone: '1111'
        };

        expect(component.getNameResponsible(responsible)).toBe('email@responsable');
    });
});
