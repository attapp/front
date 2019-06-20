import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { ModalComponent } from '../utils/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Componenete que obtiene el formulario con el nombre del proyecto y el cliente
 * más el excel que se necesitará para crear los proyectos
 */
@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})

export class CreateComponent {
    private createProjectForm: FormGroup;
    private selectedFile: File;

    /**
     * 
     * @param projectService servicio que sirve para enviar u obtener información acerca de los proyectos
     * @param modalService servicio que despliega y agrega información al modal
     */
    constructor(private projectService: ProjectService, private modalService: NgbModal) {
        this.createProjectForm = new FormGroup({
            project: new FormControl('', [
                Validators.required
            ]),
            client: new FormControl('', Validators.required),
            file: new FormControl('', Validators.required)
        });
    }


    /**
     * Método que envía la información del formulario al servicio del proyecto
     */
    private submit() {
        const uploadData = new FormData();
        uploadData.append('file', this.selectedFile, this.selectedFile.name);
        uploadData.append('client', this.createProjectForm.get('client').value);
        uploadData.append('project', this.createProjectForm.get('project').value);
        this.projectService.createProject(uploadData).subscribe(event => {
            console.log(event); // handle event here
            this.openModal();
        });
    }

    /**
     * Método que construye el modal y al enviarlo correctamente limpia el formulario
     */
    private openModal(): void {
        const modalRef = this.modalService.open(ModalComponent, { size: 'sm', backdrop: 'static', centered: true, keyboard: true });
        modalRef.componentInstance.data = 'Proyecto creado exitosamente';
        modalRef.result.then((result) => {
            this.cleanForm();
        }).catch(e => this.cleanForm());
    }

    /**
     * @param event evento que verifica cuando el archivo cambio.
     */
    private onFileChanged(event) {
        this.selectedFile = event.target.files[0];
    }

    /**
     * borra el formulario
     */
    private cleanForm() {
        this.selectedFile = null;
        this.createProjectForm.reset();
    }

}
