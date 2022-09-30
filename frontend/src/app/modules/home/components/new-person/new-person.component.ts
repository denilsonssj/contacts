import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSave, faCancel, faClose } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { PersonService } from '~/modules/home/services/person.service';
import { PersonCreateRequestDto } from '../../interfaces/dtos/person.request.dto';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.scss']
})
export class NewPersonComponent implements OnInit {
  form!: FormGroup;
  icons: any = {
    faSave,
    faCancel,
    faClose,
  };

  @Output()
  sendMessage = new EventEmitter<void>();

  @Input()
  showModal: boolean = false;

  preview!: string

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(6)],],
      phone: ['', [Validators.required, Validators.minLength(11)],],
      email: ['', [Validators.required, Validators.email],],
      birth: ['', [Validators.required,],],
      filePhoto: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { fullName, phone, email, birth } = this.form.value;
      const newPerson: PersonCreateRequestDto = {
        fullName,
        phone,
        email,
        birth: new Date(birth),
      };
      this.personService.saveOne(newPerson, this.form.value.filePhoto).subscribe({
        next: (r) => {
          this.toastrService.success(
            'Usuario criado com sucesso!',
            'Operação bem-sucedida!'
          );
          this.form.reset();
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

  onFileChange(event: any): void {
    if (event && (event.target as HTMLInputElement)?.files!.length > 0) {
      const [file] = event.target.files;
      this.form.patchValue({
        filePhoto: file,
      });
      this.form.get('filePhoto')?.updateValueAndValidity()
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.preview = event.target.result as string;
      };
      reader.readAsDataURL(file);
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
