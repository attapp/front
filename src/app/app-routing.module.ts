import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { CreateComponent } from './create/create.component';
import { ProjectComponent } from './project/project.component';
import { LoginComponent } from './login/login.component';
import { GuardService } from './services/guard.service';
import { AuthService } from './services/auth.service';

/**
 * Modulo que exporta las rutas del sistema
 */

const routes: Routes = [
    { path: 'project', component: ProjectComponent, canActivate: [GuardService] },
    { path: '', redirectTo: 'project', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [AuthService] },
    { path: 'project/:idProject', component: ProjectComponent, canActivate: [GuardService], 
        children: [
            { path: 'create', component: CreateComponent },
            { path: 'tasks', component: TaskComponent },
            
    ]},  
    { path: 'project/:idProject', component: ProjectComponent, 
        children: [
            { path: 'tasks', component: TaskComponent }
    ]},      
    //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { 

}
