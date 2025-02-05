import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private apiUrl = 'https://localhost:44330/api/Accounts';

  constructor(private http: HttpClient) {}

  getAccounts(personId:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${personId}`);
  }
  deleteAccount(data:any): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/${data.id}`);
  }
  addAccount( personId:number,account_number: number,account_type:string, balance: number): Observable<any> {
    const newAccount = {
      Person_Id : personId,
      Account_Number: account_number,
      Account_Type: account_type,
      Balance:balance
    };
  
    return this.http.post<any>(`${this.apiUrl}`, newAccount, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  updateAccount(id: number,account_number:number,account_type:string,balance:number): Observable<any> {
    const updatedAccount = {
      id: id,
      account_number: account_number,
      account_type: account_type,
      balance:balance
    };
  
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedAccount, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}