import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import b64toBlob from 'b64-to-blob';

import { HttpService } from '~/modules/core/services/http.service';
import { PersonCreateRequestDto, PersonUpdateRequestDto } from '../interfaces/dtos/person.request.dto';
import { Person, Persons } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private prefix: string = 'persons';

  constructor(private http: HttpService,) {}

  findAll(): Observable<Persons> {
    return this.http.get(`${this.prefix}`);
  }

  findPersonById(id: string,): Observable<Person> {
    return this.http.get(`${this.prefix}`, { id, });
  }

  updatePerson(personToUpdate: PersonUpdateRequestDto, photo: string): Observable<Boolean> {
    const formData = new FormData();
    const personBlob = new Blob([JSON.stringify(personToUpdate)], { type: "application/json" });
    const base64ToBlob = b64toBlob(photo, "image/jpg")
    const photoFile = new File([base64ToBlob], personToUpdate.id)

    formData.append('person', personBlob)
    formData.append('photo', photoFile)
    return this.http.post(`${this.prefix}/update`, formData, {});
  }

  deletePersonById(id: string,): Observable<Boolean> {
    return this.http.delete(`${this.prefix}/${id}`, { observe: 'response' })
      .pipe(
        map(() => true),
        catchError((err) => {
          if (err.status === 404) {
            return of(false);
          }
          throw err;
        }),
      );
  }

  saveOne(personToSave: PersonCreateRequestDto, photo: File): Observable<Person> {
    const formData = new FormData();
    const personBlob = new Blob([JSON.stringify(personToSave)], { type: "application/json" });
    formData.append('person', personBlob)
    formData.append('photo', photo);
    return this.http.post(`${this.prefix}/create`, formData);
  }
}
