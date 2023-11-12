import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = 'https://www.swapi.tech/api';

  constructor(private http: HttpClient) {}

  getPeople(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/${id}`);
  }

  getStarship(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/starships/${id}`);
  }
}
