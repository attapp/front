import { Project } from './Project';
import { Area } from './Area';
import { State } from './State';
import { Responsible } from './Responsible';
import { Duration } from 'moment';


export interface Task {

    id: number;
    description: string;
    startDatePlanning: Date;
    endDatePlanning: Date;
    externalCode: string;
    realStartDate: Date;
    realEndDate: Date;
    area: Area;
    dependencies: number[];
    project: Project;
    state: State;
    responsible: Responsible;
    variance?: Duration;
}
