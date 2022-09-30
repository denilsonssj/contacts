import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSave, faCancel, faClose } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { Person } from '~/modules/home/interfaces/person';
import { PersonService } from '~/modules/home/services/person.service';
import { PersonUpdateRequestDto } from '~/modules/home/interfaces/dtos/person.request.dto';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss'],
})
export class EditPersonComponent implements OnInit {

  @Input()
  person!: Person;

  @Output()
  sendMessage = new EventEmitter<void>();

  @Input()
  showModal: boolean = false;

  form!: FormGroup;
  icons: any = {
    faSave,
    faCancel,
    faClose,
  };

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fullName: [this.person.fullName, [Validators.required, Validators.minLength(6)],],
      phone: [this.person.phone, [Validators.required, Validators.minLength(11)],],
      email: [this.person.email, [Validators.required, Validators.email],],
      birth: [this.person.birth, [Validators.required,],],
      photoUrl: [this.person.photoUrl, [Validators.required],],
    });
  }

  onFileChange(event: any): void {
    if (event && (event.target as HTMLInputElement)?.files!.length > 0) {
      const [file] = event.target.files;
      this.form.patchValue({
        filePhoto: file,
      });
      this.form.get('filePhoto')?.updateValueAndValidity()
      const reader = new FileReader();
      reader.onload = (event: any) => {
        //this.preview = event.target.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { photoUrl, fullName, phone, email, birth } = this.form.value;
      const updatedPerson: PersonUpdateRequestDto = {
        id: this.person.id,
        fullName,
        phone,
        email,
        birth: new Date(birth)
      };
      console.log(photoUrl)
      this.personService.updatePerson(updatedPerson, photoUrl).subscribe({
        next: () => {
          this.toastrService.success(
            'Usuário atualizado com sucesso!',
            'Operação bem sucedida!'
          );
        },
        error: () => {
          this.toastrService.error(
            'Algo de errado não deu certo!',
            'Operação malsucedida!'
          );
        },
        complete: () => this.sendMessage.emit(),
      });
    }
    else {
      this.toastrService.error(
        'O formulário está inválido!',
        'Operação malsucedida!'
      );
    }
  }

  onDeleteClick() {
    this.sendMessage.emit();
  }

  onClose(): void {
   this.sendMessage.emit();
  }

  handleClose(): void {}

  onSave(): void {
 
  }

}
