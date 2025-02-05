import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AccountsService } from '../services/accounts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-account-dialog',
  standalone: true,
  imports: [    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule, // Import for formGroup
  ],
  templateUrl: './edit-account-dialog.component.html',
  styleUrl: './edit-account-dialog.component.scss'
})
export class EditAccountDialogComponent {
  editForm: FormGroup;
  personId!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private accountsService: AccountsService,
    private dialogRef: MatDialogRef<EditAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    console.log("data=>"+data);
    // Get personId from the injected data or from the route
    this.personId = data?.person_Id || this.activatedRoute.snapshot.paramMap.get('id') || null;
    console.log("data personId=>"+data?.balance);

    this.editForm = this.fb.group({
      id: [data?.account?.id || '' || null], 
      accounttype: [data?.account_type || '', Validators.required],
      accountnumber: [data?.account_number || '', Validators.required],
      balance: [data?.balance || '', Validators.required],
      personId: [data?.person_Id, Validators.required] // Use the extracted personId
    });
  }

  onSubmit() {
   

    const accountData = this.editForm.value; // Get form data
    console.log('Account Data On Submit:', accountData); 
    
    if (this.data) {
      // Existing account, update
      this.updateAccount(accountData);
    } else {
      // New account, add
      this.addAccount(accountData);
    }
  }

  onCancel() {
    this.dialogRef.close(); // Close dialog without saving
    return false;
  }
  addAccount(account: any) {
    console.log('Adding account:', account);

  this.accountsService.addAccount(account.personId, account.account_number, account.account_type, account.balance)
    .subscribe(response => {
      console.log('Account added:', response);
      this.dialogRef.close(response); // Close dialog and return data
    }, error => {
      console.error('Error adding account:', error);
    });
  }
  
  updateAccount(account: any) {
    console.log('account in question:', account);
    this.accountsService.updateAccount(account.id,account.accountnumber,account.accounttype,account.balance).subscribe(response => {
      console.log('account updated:', response);
      this.dialogRef.close(response); // Close dialog and return data
    }, error => {
      console.error('Error updating person:', error);
    });
  }
}
