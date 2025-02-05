import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { CommonModule } from '@angular/common'; 
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditAccountDialogComponent } from '../../edit-account-dialog/edit-account-dialog.component';
@Component({
  selector: 'app-account',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
   imports: [CommonModule,MatDialogModule],  // Ensure MatDialogModule is imported
})
export class AccountComponent implements OnInit {
  accounts: any[] = [];
  personId!: string;
  constructor(private dialog: MatDialog,private activatedRoute:ActivatedRoute,private accountService: AccountsService, private router:Router) {}

  ngOnInit(): void {
     // Get the person ID from the route parameters
     this.activatedRoute.paramMap.subscribe(params => {
      this.personId = params.get('id')!;
      console.log('Person ID:', this.personId);

      // Now you can use this.personId to fetch account details or perform other actions
    });
  //this.loadTransactions();  // Updated method name
    this.loadAccounts(this.personId); // Load accounts when the component is initialized
  }

  loadAccounts(personId:string): void {
    this.accountService.getAccounts(personId).subscribe((data) => {
      this.accounts = data;
    });
  }

  addAccount() {
    console.log('Add account');
    this.router.navigate(['/add-account', this.personId]);
  }

  editAccount(account: any) {
    console.log('Edit:', account);
    this.openEditDialog(account);
  }

  openEditDialog(account: any) {  // Fixed incorrect placement of method
    console.log("Account Object:", JSON.stringify(account));
    const dialogRef = this.dialog.open(EditAccountDialogComponent, {
      width: '400px',
      data: {account}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('account updated:', result);
        this.loadAccounts(account.id);  // Refresh the list after update
      }
    });
  }
  // Handle delete action
  deleteAccount(account: any): void {
    console.log('Delete:', account);
    // Implement delete functionality (call API to delete the account)
    this.accountService.deleteAccount(account).subscribe((account) => {data: account});
  }

  // Handle select action
  selectAccount(account: any): void {
    console.log('Selected:', account);
    console.log('Selected:', account);
    this.router.navigate(['/transactions', account.id]);
  }
}