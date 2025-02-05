import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Needed for directives like *ngFor
import { TransactionsService } from '../../services/transactions.service';  // Updated to TransactionService
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditTransactionDialogComponent } from '../../edit-transaction-dialog/edit-transaction-dialog.component';  // Adjusted to EditTransactionDialogComponent
import { Router , ActivatedRoute} from '@angular/router';  // ✅ Import Router


@Component({
  selector: 'app-transaction',
  templateUrl: './transactions.component.html',  // Updated to reflect the new component name
  styleUrls: ['./transactions.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule],  // Ensure MatDialogModule is imported
})
export class TransactionComponent implements OnInit {
  transactions: any[] = [];  // Changed from accounts to transactions
  accountId!: string;
  constructor(
    private transactionService: TransactionsService,  // Updated service to TransactionService
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(){
    // Get the person ID from the route parameters
    this.activatedRoute.paramMap.subscribe(params => {
      this.accountId = params.get('id')!;
      console.log('account ID:', this.accountId);

      // Now you can use this.personId to fetch account details or perform other actions
    });
    this.loadTransactions(this.accountId);  // Updated method name
  }

  loadTransactions(account:any) {  // Renamed method to reflect the new context
    this.transactionService.getAccountTransactions(account).subscribe((data) => {
      this.transactions = data;  // Storing transactions in the array    
      console.log(data);
    });

  }
  addTransaction() {  // Changed to edit transactions
    console.log('add new transction for account:', this.accountId);
    this.router.navigate(['/add-transactions', this.accountId]); 
  }

  editTransaction(transaction: any) {  // Changed to edit transactions
    console.log('Edit:', transaction);
    this.openEditDialog(transaction);
  }

  openEditDialog(transaction: any) {  // Updated to open edit dialog for transactions
    const dialogRef = this.dialog.open(EditTransactionDialogComponent, {
      width: '400px',
      data: transaction
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Transaction updated:', result);
        this.loadTransactions(this.accountId);  // Refresh the list after update
      }
    });
  }

  deleteTransaction(transaction: any) {  // Adjusted to delete transactions
    console.log('Delete:', transaction);
    // Implement API call to delete the transaction
    this.transactionService.deleteTransactions(transaction).subscribe((transaction) => {data: transaction});
  }

  selectTransaction(transaction: any) {  // Renamed method to select a transaction
    console.log('Selected:', transaction);
    this.router.navigate(['/transaction', transaction.id]);  // Navigate to transaction details
    // Implement logic for selection (e.g., pass data to another component)
  }
}