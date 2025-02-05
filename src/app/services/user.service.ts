import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:44330/api/Users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    // Use HTTP GET with query parameters
    return this.http.get<any>(`${this.apiUrl}?username=${username}&password=${password}`);
  }
}