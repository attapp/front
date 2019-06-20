import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Modal que contiene un texto en especifico
 * es un modal informativo, se espera contenga otros iconos en el futuro
 */
@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent {

    @Input() public data;

    constructor(public activeModal: NgbActiveModal) { }

}
