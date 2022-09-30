import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '~/modules/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpS: HttpService, private http: HttpClient,) {}

  upload(file: File, url: string,): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    const request = new HttpRequest('POST', url, {});
    return this.http.request(request);
  }

}
