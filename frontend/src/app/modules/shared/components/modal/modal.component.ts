import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faClose, faSave, faCancel } from'@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor() { }

  @Input()
  showModal: boolean = true;
  icons = {
    faClose,
    faCancel,
    faSave,
  };

  @Output()
  onSubmit = new EventEmitter<void>();

  ngOnInit(): void {}

  onClose(): void {
    this.showModal = !this.showModal;
    this.onSubmit.emit();
  }

  handleClose(): void {
    this.showModal = false;
  }

  toggle(): void {
    this.showModal = !this.showModal;
    this.onSubmit.emit();
  }

  onSave(): void {
    this.showModal = !this.showModal;
    this.onSubmit.emit();
  }

}
