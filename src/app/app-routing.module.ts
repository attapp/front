import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { CreateComponent } from './create/create.component';
import { ProjectComponent } from './project/project.component';
import { LoginComponent } from './login/login.component';
import { GuardService } from './services/guard.service';

/**
 * Modulo que exporta las rutas del sistema
 */

const routes: Routes = [
    { path: 'project', component: ProjectComponent,  canActivate: [GuardService] },
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'project/:idProject', component: ProjectComponent, 
        children: [
            { path: 'tasks', component: TaskComponent }
    ]
    },        
    { path: 'create', component: CreateComponent },
    { path: 'project', component: ProjectComponent },
    //{ path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { 

}
