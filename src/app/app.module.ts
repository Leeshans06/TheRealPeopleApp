import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';  // Import MatTableModule
import { MatButtonModule } from '@angular/material/button';  // Import MatButtonModule
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AccountComponent } from './pages/accounts/accounts.component';  // Import AccountsComponent
import { TransactionComponent } from './pages/transactions/transactions.component'; 
import { TransactionsService } from './services/transactions.service';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    AccountComponent,  // Declare your AccountsComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,  // Add MatTableModule to imports
    MatButtonModule,  // Add MatButtonModule to imports
    RouterModule,ReactiveFormsModule
  ],
  providers: [TransactionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }