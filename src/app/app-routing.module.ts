import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { CreateComponent } from './create/create.component';
import { ProjectComponent } from './project/project.component';
import { LoginComponent } from './login/login.component';
import { GuardService } from './services/guard.service';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { ProjectDashComponent } from './project-dash/project-dash.component';
import { ProjectResponsableComponent } from './project-responsable/project-responsable.component';
import { TaskResponsableComponent } from './task-responsable/task-responsable.component';

/**
 * Modulo que exporta las rutas del sistema
 */

const routes: Routes = [
    
   
    
    //{ path: '', component:ProjectDashComponent , pathMatch: 'full'},
    { path: '', component: AppComponent, pathMatch: 'full' }, // este debes comentar
    // CUANDO NO QUIERAS LOGEARTE 
    // { path: '', component: ProjectDashComponent } - para proyecto -
    // { path: '', component: DashboardComponent } - para dashboard -
    { path: 'prueba', component: DashboardComponent, canActivate: [GuardService]  },

    { path: 'responsable', component: TaskResponsableComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/:idProfile', component: LoginComponent },
    { path: 'dashboards', component: ProjectDashComponent, canActivate: [GuardService] },
    { path: 'project', component: ProjectComponent, canActivate: [GuardService] },
    { path: 'create', component: CreateComponent },
    // routes for Lider
    { path: 'projectresp', component: ProjectResponsableComponent, canActivate: [GuardService] },
    // routes for Adm (FALTAN)
    { path: 'project/:idProject', component: ProjectComponent, canActivateChild: [GuardService], 
        children: [
            { path: 'tasks', component: TaskComponent }
    ]},  
    // routes for Reponsable
    { path: 'projectresp/:idProject', component: ProjectComponent, 
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
