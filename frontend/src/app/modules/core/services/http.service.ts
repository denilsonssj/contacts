import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url: string = 'http://localhost:8080';

  constructor(private http: HttpClient,) {}

  get(url: string, options: any = {},): Observable<any> {
    return this.http.get(`${this.url}/${url}`, options,);
  }

  post(url: string, body: any = {}, headers: any = {},): Observable<any> {
    return this.http.post<any>(`${this.url}/${url}`, body, headers);
  }

  delete(url: string, options: any = {},): Observable<any> {
    return this.http.delete(`${this.url}/${url}`, options);
  }

  put(url: string, body: any = {}, headers: any = {},): Observable<any> {
    return this.http.put(`${this.url}/${url}`, body, headers);
  }

  private head() {
    const httpHeaders = new HttpHeaders()
      //.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
      .append('Access-Control-Allow-Origin', '*');
      return httpHeaders;
  }
}
