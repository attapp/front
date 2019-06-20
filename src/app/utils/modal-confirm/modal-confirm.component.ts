import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Componente que muestra el modal de confirmación, este modal contiene 3 datoss
 */
@Component({
    selector: 'app-modal-confirm',
    templateUrl: './modal-confirm.component.html'
})
export class ModalConfirmComponent {

    @Input() public data: string;
    @Input() public data2: string;
    @Input() public data3: string;

    constructor(public activeModal: NgbActiveModal) { }

    success() {
        this.activeModal.close(true);
    }

    close() {
        this.activeModal.close(false);
    }

}
