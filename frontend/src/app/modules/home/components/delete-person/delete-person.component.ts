import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faSave, faCancel, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delete-person',
  templateUrl: './delete-person.component.html',
  styleUrls: ['./delete-person.component.scss']
})
export class DeletePersonComponent implements OnInit {

  @Input()
  showModal: boolean;

  @Input()
  personId!: string;

  @Output()
  onCompleteOperation: EventEmitter<string>;

  @Output()
  onCancelOperation: EventEmitter<void>;

  icons = {
    faClose,
    faSave,
    faCancel,
  };

  constructor() {
    this.showModal = false;
    this.onCompleteOperation = new EventEmitter<string>();
    this.onCancelOperation = new EventEmitter<void>();
  }

  ngOnInit(): void {}

  onDelete() {
    this.onCompleteOperation.emit(this.personId);
  }

  onCancel() {
    this.onCancelOperation.emit();
  }

}
