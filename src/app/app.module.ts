import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectComponent } from './project/project.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './task/task.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './utils/interceptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ModalComponent } from './utils/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from './utils/pipes/truncate.pipe';
import { registerLocaleData, TitleCasePipe } from '@angular/common';
import localeCL from '@angular/common/locales/es-CL';
import { environment } from 'src/environments/environment';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalConfirmComponent } from './utils/modal-confirm/modal-confirm.component';
import { LoaderComponent } from './utils/loader/loader.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from "./services/auth.service";
import { GuardService } from "./services/guard.service";
import { BtnLogoutComponent } from './btn-logout/btn-logout.component';
import { ProjectDashComponent } from './project-dash/project-dash.component';
import { ProjectResponsableComponent } from './project-responsable/project-responsable.component';
import { TaskResponsableComponent } from './task-responsable/task-responsable.component';
//import { ChartsModule } from 'ng2-charts';



registerLocaleData(localeCL);
const config: SocketIoConfig = { url: environment.API_ENDPOINT, options: {} };
@NgModule({
    declarations: [
        AppComponent,
        ProjectComponent,
        TaskComponent,
        ModalComponent,
        TruncatePipe,
        CreateComponent,
        ModalConfirmComponent,
        LoaderComponent,
        CompletedTasksComponent,
        LoginComponent,
        DashboardComponent,
        BtnLogoutComponent,
        ProjectDashComponent,
        ProjectResponsableComponent,
        TaskResponsableComponent
    ],
    imports: [
        //ChartsModule,
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        SocketIoModule.forRoot(config),
        FormsModule,
        ReactiveFormsModule,
        ScrollingModule

    ],
    providers: [GuardService, AuthService, {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true,  },
    TitleCasePipe,
    { provide: LOCALE_ID, useValue: 'es-CL' }],
    bootstrap: [AppComponent],
    entryComponents: [ModalComponent, ModalConfirmComponent]
})
export class AppModule { }
