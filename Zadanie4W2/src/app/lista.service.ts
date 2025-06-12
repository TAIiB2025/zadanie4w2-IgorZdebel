import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usluga } from '../models/usluga';
import { UslugaBody } from '../models/usluga-body';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private apiUrl = 'http://localhost:5003/api/Lista';

  constructor(private http: HttpClient) {}

  get(): Observable<Usluga[]> {
    return this.http.get<Usluga[]>(this.apiUrl);
  }

  getByID(id: number): Observable<Usluga> {
    return this.http.get<Usluga>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  put(id: number, body: UslugaBody): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, body);
  }

  post(body: UslugaBody): Observable<void> {
    return this.http.post<void>(this.apiUrl, body);
  }

  getFiltrowane(fraza: string): Observable<Usluga[]> {
    const url = `${this.apiUrl}?fraza=${encodeURIComponent(fraza)}`;
    return this.http.get<Usluga[]>(url);
  }
  
}
