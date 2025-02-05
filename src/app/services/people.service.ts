import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private apiUrl = 'https://localhost:44330/api/People';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deletePeople(data:any): Observable<any[]> {
    console.log("deleting ..."+`${this.apiUrl}/${data.id}`);
    return this.http. delete<any[]>(`${this.apiUrl}/${data.id}`);
   
  }
  addPerson( name: string, email: string,surname:string,idnumber:number,accountnumber:number): Observable<any> {
    const newPerson = {
     
      name: name,
      email: email,
      dateDateOfBirth:'0000-00-00 00:00:00',
      surname: surname,         
      idnumber: idnumber,       
      accountnumber: accountnumber, 
   
    };
  
    return this.http.post<any>(`${this.apiUrl}`, newPerson, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  updatePerson(id: number, name: string, email: string,surname:string,idnumber:number,accountnumber:number): Observable<any> {
    const updatedPerson = {
      id: id,
      name: name,
      email: email,
      surname: surname,         
      idnumber: idnumber,       
      accountnumber: accountnumber, 
    };
  
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedPerson, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}