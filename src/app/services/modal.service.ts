import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmComponent } from '../utils/modal-confirm/modal-confirm.component';
import { ModalComponent } from '../utils/modal/modal.component';
import { Task } from '../interfaces/Task';


/**
 * Servicio que contiene los modal existentes hasta el momento
 * este servicio crea y agrega datos a los modal existentes,
 * permite centralizar los modals
 */
@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(private modalService: NgbModal) { }

    openModalConfirm(options: NgbModalOptions, data: string, data1: string, data2: string): NgbModalRef {
        const modal = this.modalService.open(ModalConfirmComponent, options);
        modal.componentInstance.data = data;
        modal.componentInstance.data2 = data1;
        modal.componentInstance.data3 = data2;
        return modal;

    }

    openModalInfo(options: NgbModalOptions, data: string): NgbModalRef {
        const modal = this.modalService.open(ModalComponent, options);
        modal.componentInstance.data = data;
        return modal;
    }

    openModalTask(options: NgbModalOptions, task: Task): NgbModalRef {
        return this.modalService.open(ModalComponent, options);
    }
}
