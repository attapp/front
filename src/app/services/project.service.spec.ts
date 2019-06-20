
import { ProjectService } from './project.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../interfaces/Project';
import { of } from 'rxjs';

describe('ProjectService', () => {

    let httpClientSpy: { get: jasmine.Spy };
    let projectService: ProjectService;

    beforeEach(() => {
        // TODO: spy on other methods too
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        projectService = new ProjectService(httpClientSpy as any);
    });


    it('should be created', () => {
        expect(projectService).toBeTruthy();
    });

    it('should return expected projects (HttpClient called once)', () => {
        const expectedProjects: Project[] =
            [{ id: 1, name: 'A', description: 'B' }, { id: 2, name: 'B', description: 'B' }];

        httpClientSpy.get.and.returnValue(of(expectedProjects));

        projectService.getProjects().subscribe(
            projects => expect(projects).toEqual(expectedProjects, 'expected heroes'),
            fail
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    xit('should return an error when the server returns a 404', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404, statusText: 'Not Found'
        });

        httpClientSpy.get.and.returnValue(of(errorResponse));

        projectService.getProjects().subscribe(
            project => fail('expected an error, not projects'),
            error => expect(error.message).toContain('test 404 error')
        );
    });
});

