import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { CreateComponent } from './create/create.component';
import { ProjectComponent } from './project/project.component';

/**
 * Modulo que exporta las rutas del sistema
 */
const routes: Routes = [
    {
        path: 'projects/:idProject', component: ProjectComponent,
        children: [
            { path: 'tasks', component: TaskComponent }
        ]
    },
    { path: 'create', component: CreateComponent },
    { path: 'projects', component: ProjectComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'projects' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
