import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';
/*import { LoginComponent } from './login/login.component';*/
import { CreateComponent } from './create/create.component';
import { ProjectComponent } from './project/project.component';
import { LoginComponent } from './login/login.component';

/**
 * Modulo que exporta las rutas del sistema
 */

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'proyect/:idProject', component: ProjectComponent},
    { path: 'tasks', component: TaskComponent },
        
    { path: 'create', component: CreateComponent },
    { path: 'proyect', component: ProjectComponent },
    //{ path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { 

}
