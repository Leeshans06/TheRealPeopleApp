import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { TransactionsService } from '../services/transactions.service';
@Component({
  selector: 'app-edit-transaction-dialog',
  templateUrl: './edit-transaction-dialog.component.html',
  styleUrl: './edit-transaction-dialog.component.scss',
   imports: [
      CommonModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule
    ],
})
export class EditTransactionDialogComponent {
  editForm: FormGroup;
  accountId: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTransactionDialogComponent>,
    private transactionsService: TransactionsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.accountId = data?.account_id || '';
    this.editForm = this.fb.group({
      transaction_type: [data?.transaction_Type || '', Validators.required],
      amount: [data?.amount || '', [Validators.required, Validators.pattern('^[0-9]*$')]], // Ensure amount is a number
      description: [data?.description || '', Validators.required],
      account_id: [this.accountId]
    });
  }

  // Handles form submission (add or update transaction)
  onSubmit(): void {

      const formValue = this.editForm.value;
      this.transactionsService.updateTransaction(formValue).subscribe(response => {
        console.log('Transaction updated:', response);
        this.dialogRef.close(response); // Close dialog and return data
      }, error => {
        console.error('Error updating Transaction:', error);
      });
      this.dialogRef.close(formValue);
  }

  // Cancel the form and close the dialog
  onCancel(): void {
    this.dialogRef.close();
  }
}