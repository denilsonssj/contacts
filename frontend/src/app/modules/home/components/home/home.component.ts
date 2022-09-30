import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faCoffee, faPlus, faEdit, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Person, Persons } from '~/modules/home/interfaces/person';
import { PersonService } from '~/modules/home/services/person.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  persons$!: Observable<Persons>;
  icons = {
    faCoffee,
    faPlus,
    faEdit,
    faTrash,
    faUpload,
  };
  showCreatePersonModal: boolean;
  showEditPersonModal: boolean;
  showDeletePersonModal: boolean;
  selectedPerson!: Person;

  constructor(
    private personService: PersonService,
    private toastrService: ToastrService,
  ) {
    this.showCreatePersonModal = false;
    this.showEditPersonModal = false;
    this.showDeletePersonModal = false;
  }

  ngOnInit(): void {
    this.fetchAllPersons();
  }

  on(): void {
    this.showCreatePersonModal = false;
  }

  fetchAllPersons(): void {
    this.persons$ = this.personService.findAll();
  }

  onCreatePerson(): void {
    this.showCreatePersonModal = false;
    this.fetchAllPersons();
  }

  onEditPerson(): void {
    this.showEditPersonModal = false;
    this.fetchAllPersons();
  }

  onDeletePerson(id: string): void {
    this.showDeletePersonModal = false;
    this.personService.deletePersonById(id).subscribe({
      next: (isDone) => {
        this.toastrService.success(
          'Usuario removido com sucesso!',
          'Operação bem sucedida!'
        );
        this.fetchAllPersons();
      },
      error: () => {
        this.toastrService.error(
          'Algo de errado não deu certo!',
          'Operação mal sucedida!'
        );
      }
    });
  }

  onNewClick(): void {
    this.showCreatePersonModal = true;
  }

  onEditButtonClick(person: Person): void {
    this.showEditPersonModal = true;
    this.selectedPerson = person;
  }

  onDeleteClick(person: Person) {
    this.showDeletePersonModal = true;
    this.selectedPerson = person;
  }

  onCancelDeleteOperation(): void {
    this.showDeletePersonModal = false;
  }

  onEditClick(person: Person): void {
    this.selectedPerson = person;
  }
}
