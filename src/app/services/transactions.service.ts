import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private apiUrl = 'https://localhost:44330/api/Transactions';

  constructor(private http: HttpClient) {}
 
  getAccountTransactions(account:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${account}`);
  }
  deleteTransactions(data:any): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/${data.id}`);
  }
  updateTransaction( data:any): Observable<any> {

    console.log("data for updating transaction:"+JSON.stringify(data));
    const updatedTransaction = {
      id: data.id,
      transactionType: data.transactionType,
      amount: data.amount,
      description: data.description
    };
  
    return this.http.put<any>(`${this.apiUrl}/${data.id}`, updatedTransaction, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  
  addTransaction( accountId: number, transactionType: string,  amount: number,  description: string  ): Observable<any> {
    const newTransaction = {
      AccountId: accountId,
      transactionType: transactionType,
      amount: amount,
      description: description
    };
  
    return this.http.post<any>(`${this.apiUrl}`, newTransaction, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  
}